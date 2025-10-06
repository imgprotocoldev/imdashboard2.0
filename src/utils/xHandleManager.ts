import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

/**
 * Handles X (Twitter) handle storage logic
 * Only stores the handle once - never overwrites existing handles
 */
export class XHandleManager {
  /**
   * Processes X login and stores handle if not already present
   * @param user - Supabase user object
   * @returns Promise<boolean> - true if handle was stored/updated, false if already exists
   */
  static async processXLogin(user: User): Promise<boolean> {
    try {
      // Check if this is a Twitter login
      const isTwitterLogin = user.app_metadata?.provider === 'twitter' || 
                            user.user_metadata?.provider === 'twitter';
      
      if (!isTwitterLogin) {
        return false;
      }

      // Extract Twitter handle from user metadata
      const twitterHandle = user.user_metadata?.preferred_username || 
                           user.user_metadata?.user_name || 
                           user.user_metadata?.twitter_username ||
                           user.user_metadata?.screen_name;

      if (!twitterHandle) {
        console.warn('Twitter login detected but no handle found in metadata:', user.user_metadata);
        return false;
      }

      // Check if user already has an x_handle in profiles
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('x_handle')
        .eq('id', user.id)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching existing profile:', fetchError);
        return false;
      }

      // If x_handle already exists, do nothing
      if (existingProfile?.x_handle) {
        console.log('User already has X handle stored:', existingProfile.x_handle);
        return false;
      }

      // Store the X handle (only if it doesn't exist)
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          x_handle: twitterHandle,
          // Only set these if profile doesn't exist
          username: existingProfile ? undefined : user.user_metadata?.full_name || user.email?.split('@')[0] || 'Guest',
          avatar_name: existingProfile ? undefined : 'user1',
          country: existingProfile ? undefined : ''
        }, { 
          onConflict: 'id',
          ignoreDuplicates: false
        });

      if (error) {
        console.error('Error storing X handle:', error);
        return false;
      }

      console.log('X handle stored successfully:', twitterHandle);
      return true;

    } catch (error) {
      console.error('Error in processXLogin:', error);
      return false;
    }
  }

  /**
   * Connects X account to existing profile (for users who signed up with other methods)
   * @param user - Supabase user object
   * @returns Promise<boolean> - true if handle was stored, false if error or already exists
   */
  static async connectXToExistingProfile(user: User): Promise<boolean> {
    try {
      // Check if this is a Twitter login
      const isTwitterLogin = user.app_metadata?.provider === 'twitter' || 
                            user.user_metadata?.provider === 'twitter';
      
      if (!isTwitterLogin) {
        return false;
      }

      // Extract Twitter handle
      const twitterHandle = user.user_metadata?.preferred_username || 
                           user.user_metadata?.user_name || 
                           user.user_metadata?.twitter_username ||
                           user.user_metadata?.screen_name;

      if (!twitterHandle) {
        console.warn('Twitter login detected but no handle found in metadata:', user.user_metadata);
        return false;
      }

      // Check if user already has an x_handle
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('x_handle')
        .eq('id', user.id)
        .maybeSingle();

      if (fetchError) {
        console.error('Error fetching existing profile:', fetchError);
        return false;
      }

      // If x_handle already exists, do nothing
      if (existingProfile?.x_handle) {
        console.log('User already has X handle stored:', existingProfile.x_handle);
        return false;
      }

      // Update existing profile with X handle
      const { error } = await supabase
        .from('profiles')
        .update({ x_handle: twitterHandle })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile with X handle:', error);
        return false;
      }

      console.log('X handle connected to existing profile:', twitterHandle);
      return true;

    } catch (error) {
      console.error('Error in connectXToExistingProfile:', error);
      return false;
    }
  }

  /**
   * Gets the X handle for a user
   * @param userId - User ID
   * @returns Promise<string | null> - X handle or null if not found
   */
  static async getXHandle(userId: string): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('x_handle')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching X handle:', error);
        return null;
      }

      return data?.x_handle || null;
    } catch (error) {
      console.error('Error in getXHandle:', error);
      return null;
    }
  }
}
