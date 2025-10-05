import React, { useMemo, useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import ComponentCard from "../components/common/ComponentCard";
import Input from "../components/form/input/InputField";
import MultiSelect from "../components/form/MultiSelect";
import TextArea from "../components/form/input/TextArea";
import { useDropzone } from "react-dropzone";

export default function Support() {
  // Social platforms data reused from Information page expectations
  const socialPlatforms = useMemo(
    () => [
      { name: "Telegram", icon: "/images/support/telegram.webp", url: "https://t.me/imgprotocol" },
      { name: "Discord", icon: "/images/support/discord.webp", url: "https://discord.gg/imgprotocol" },
      { name: "CoinGecko", icon: "/images/support/CoinGeckologo.webp", url: "https://www.coingecko.com/" },
      { name: "CoinMarketCap", icon: "/images/support/coinmarketcaplogo.webp", url: "https://coinmarketcap.com/" },
      { name: "DexScreener", icon: "/images/support/dexscreener.webp", url: "https://dexscreener.com/solana/cxgcuecqdabpvjwh5cweir9y5fy9sktjhgutmc95bgy3" },
      { name: "X", icon: "/images/support/xlogo.webp", url: "https://x.com/imgprotocol" },
      { name: "Instagram", icon: "/images/support/instagram.webp", url: "https://instagram.com/" },
      { name: "Truth Social", icon: "/images/support/truthsocial.webp", url: "https://truthsocial.com/" },
      { name: "YouTube", icon: "/images/support/youtube.webp", url: "https://youtube.com/" },
      { name: "Stocktwits", icon: "/images/support/stocktwits1.webp", url: "https://stocktwits.com/" },
      { name: "Medium", icon: "/images/support/medium.webp", url: "https://medium.com/" },
    ],
    []
  );

  const [activeTab, setActiveTab] = useState<'Chatroom' | 'Marketplace' | 'Socials' | 'Decentralized exchange' | 'Centralized exchange' | 'Wallets'>('Chatroom');

  // Contact form state
  const [email, setEmail] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
  });

  const topicOptions = [
    { value: "dashboard", text: "Dashboard support" },
    { value: "token", text: "Token Support" },
    { value: "partnership", text: "Partnership" },
    { value: "howtobuy", text: "How to Buy" },
    { value: "issue", text: "Issue" },
  ];

  const validate = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return false;
    }
    if (topics.length === 0) {
      setErrorMsg("Please select at least one support topic.");
      return false;
    }
    if (!message.trim()) {
      setErrorMsg("Please write your inquiry in the message field.");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSuccessMsg("");
    try {
      // Build mailto link
      const subject = encodeURIComponent(`Support Request - ${topics.join(", ") || "General"}`);
      const bodyLines = [
        `From: ${email}`,
        `Topics: ${topics.join(", ") || "N/A"}`,
        "",
        message,
      ];
      const body = encodeURIComponent(bodyLines.join("\n"));
      const mailto = `mailto:imgprotocol18@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailto;
      setSuccessMsg("Opening your email client. If it doesn't open, please email imgprotocol18@gmail.com.");
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageMeta
        title="Support | IMG Dashboard"
        description="Contact support and view token information and integrations."
      />
      <PageBreadcrumb pageTitle="Support" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 space-y-6">
        {/* Token Information (headerless) */}
        <ComponentCard className="h-fit">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="flex items-center gap-4 md:col-span-1">
              <img src="/images/support/imglogonew.webp" alt="IMG" className="w-24 h-24 rounded-lg object-contain bg-white dark:bg-white/5 p-2 border border-gray-200 dark:border-white/[0.06]" />
              <div>
                <div className="text-xl font-semibold text-gray-900 dark:text-white">Infinite Money Glitch</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Ticker: <span className="font-medium text-gray-900 dark:text-gray-200">IMG</span></div>
              </div>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] p-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Contract Address</div>
                <div className="text-[13px] font-mono break-all text-gray-900 dark:text-white">znv3FZt2HFAvzYf5LxzVyryh3mBXWuTRRng25gEZAjh</div>
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] p-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Reward Address</div>
                <div className="text-[13px] font-mono break-all text-gray-900 dark:text-white">DvJ5raMqt67hKat9XZYUYpSWvKU1yyQdpbAuytauz2X9</div>
              </div>
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-gray-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.03] p-4">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Infra Wallet</div>
                  <div className="text-[13px] font-mono break-all text-gray-900 dark:text-white">7sFfWaCKUfCykeh3suuuT7X9RGXjwq6VtQu6qk1KgUgF</div>
                </div>
                <div className="flex items-center md:justify-end gap-3">
                  <a href="https://jup.ag/swap?sell=So11111111111111111111111111111111111111112&buy=znv3FZt2HFAvzYf5LxzVyryh3mBXWuTRRng25gEZAjh" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">Buy Now</a>
                  <a href="https://dexscreener.com/solana/cxgcuecqdabpvjwh5cweir9y5fy9sktjhgutmc95bgy3" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-lg border border-gray-200 dark:border-white/[0.06] text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/[0.06] text-sm font-medium">View Chart</a>
                </div>
              </div>
            </div>
          </div>
        </ComponentCard>

        {/* Integrations (tabs for cleaner UI) */}
        <ComponentCard title="Integrations" className="h-fit">
          <div>
            <div className="flex gap-2 border-b border-gray-200 dark:border-white/[0.06] mb-4 overflow-x-auto no-scrollbar">
              {(["Chatroom","Marketplace","Socials","Decentralized exchange","Centralized exchange","Wallets"] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab as any)} className={`whitespace-nowrap px-3 py-2 text-sm rounded-t-md ${activeTab===tab? 'bg-white dark:bg-white/[0.06] text-gray-900 dark:text-white border border-b-0 border-gray-200 dark:border-white/[0.06]':'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}>{tab}</button>
              ))}
            </div>
            {activeTab === 'Chatroom' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {socialPlatforms.filter(s => ['Telegram','Discord'].includes(s.name)).map((platform, index) => (
                  <a key={index} href={platform.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200">
                    <img src={platform.icon} alt={platform.name} className="w-6 h-6 object-contain mb-2" />
                    <div className="text-xs font-medium text-gray-900 dark:text-white">{platform.name}</div>
                  </a>
                ))}
              </div>
            )}
            {activeTab === 'Marketplace' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {socialPlatforms.filter(s => ['CoinGecko','CoinMarketCap','DexScreener'].includes(s.name)).map((platform, index) => (
                  <a key={index} href={platform.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200">
                    <img src={platform.icon} alt={platform.name} className="w-6 h-6 object-contain mb-2" />
                    <div className="text-xs font-medium text-gray-900 dark:text-white">{platform.name}</div>
                  </a>
                ))}
              </div>
            )}
            {activeTab === 'Socials' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {socialPlatforms.filter(s => ['X','Instagram','Truth Social','YouTube','Stocktwits','Medium'].includes(s.name)).map((platform, index) => (
                  <a key={index} href={platform.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200">
                    <img src={platform.icon} alt={platform.name} className="w-6 h-6 object-contain mb-2" />
                    <div className="text-xs font-medium text-gray-900 dark:text-white text-center">{platform.name}</div>
                  </a>
                ))}
              </div>
            )}
            {activeTab === 'Decentralized exchange' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[{ name: 'Raydium', icon: '/images/support/raydiumlogo.webp', url: 'https://raydium.io' },
                  { name: 'Jupiter', icon: '/images/support/jupiterlogo.webp', url: 'https://jup.ag' },
                  { name: 'Orca', icon: '/images/support/orcadexlogo.webp', url: 'https://www.orca.so/' },
                  { name: 'Phantom', icon: '/images/support/phantomlogo.webp', url: 'https://phantom.app/' }].map((item, index) => (
                  <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200">
                    <img src={item.icon} alt={item.name} className="w-6 h-6 object-contain mb-2" />
                    <div className="text-xs font-medium text-gray-900 dark:text-white text-center">{item.name}</div>
                  </a>
                ))}
              </div>
            )}
            {activeTab === 'Centralized exchange' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[{ name: 'Bitrue', icon: '/images/support/bitruelogo.webp', url: 'https://www.bitrue.com/' },
                  { name: 'Alph.ai', icon: '/images/support/alphailogo.webp', url: 'https://alph.ai/' },
                  { name: 'LBank', icon: '/images/support/lbanklogo.webp', url: 'https://www.lbank.com/' }].map((item, index) => (
                  <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200">
                    <img src={item.icon} alt={item.name} className="w-6 h-6 object-contain mb-2" />
                    <div className="text-xs font-medium text-gray-900 dark:text-white text-center">{item.name}</div>
                  </a>
                ))}
              </div>
            )}
            {activeTab === 'Wallets' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[{ name: 'Phantom', icon: '/images/support/phantomlogo.webp', url: 'https://phantom.app/' },
                  { name: 'Solflare', icon: '/images/support/solflare.webp', url: 'https://solflare.com/' },
                  { name: 'Atomic', icon: '/images/support/atomicwallet.webp', url: 'https://atomicwallet.io/' },
                  { name: 'Jupiter', icon: '/images/support/jupiterlogo.webp', url: 'https://jup.ag' }].map((item, index) => (
                  <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200">
                    <img src={item.icon} alt={item.name} className="w-6 h-6 object-contain mb-2" />
                    <div className="text-xs font-medium text-gray-900 dark:text-white text-center">{item.name}</div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </ComponentCard>

        {/* Contact Us */}
        <ComponentCard title="Contact Us" className="h-fit">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Email<span className="text-error-500"> *</span></label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errorMsg && (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))}
                />
              </div>
              <div>
                <MultiSelect
                  label="Topics *"
                  options={topicOptions}
                  defaultSelected={topics}
                  onChange={setTopics}
                  closeOnSelect
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Message<span className="text-error-500"> *</span></label>
                <TextArea
                  rows={5}
                  value={message}
                  onChange={setMessage}
                  error={!!errorMsg && !message.trim()}
                />
                <div className="mt-3 flex items-center gap-3">
                  <button type="submit" disabled={submitting} className="px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                  {errorMsg && <div className="text-xs text-error-600">{errorMsg}</div>}
                  {successMsg && <div className="text-xs text-success-600">{successMsg}</div>}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Attach Images (optional)</label>
                <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500 h-full min-h-[140px]">
                  <div
                    {...getRootProps()}
                    className={`rounded-xl border-dashed p-5 lg:p-6 h-full flex items-center justify-center ${
                      isDragActive
                        ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                        : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center">
                      <div className="mb-2 flex justify-center">
                        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                          <svg className="fill-current" width="22" height="22" viewBox="0 0 29 28" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"/></svg>
                        </div>
                      </div>
                      <h4 className="mb-1 font-medium text-gray-800 text-sm dark:text-white/90">{isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}</h4>
                      <span className=" text-center mb-1 block w-full max-w-[290px] text-xs text-gray-700 dark:text-gray-400">PNG, JPG, WebP, SVG</span>
                      {files.length > 0 && (
                        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">{files.length} file(s) attached</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
        </div>
            {/* notifications moved near submit button */}
            {/* Submit button moved next to Message field */}
          </form>
        </ComponentCard>
      </div>
    </>
  );
}
