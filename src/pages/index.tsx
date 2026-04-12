import React from 'react';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center text-center space-y-12">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            The Next Generation of <span className="text-protox-primary">Yield Optimization</span> on Stellar
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Securely deposit your assets into Protox vaults and earn optimized rewards. 
            Built on Soroban for maximum efficiency and security.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/dashboard" className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4">
              <span>Get Started</span>
              <ArrowRight size={20} />
            </Link>
            <a href="https://docs.protox.io" className="btn-outline flex items-center justify-center space-x-2 text-lg px-8 py-4">
              <span>Read Docs</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-12">
          <div className="card text-left space-y-4">
            <div className="p-3 bg-blue-100 text-protox-primary rounded-xl w-fit">
              <Shield size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Secure by Design</h3>
            <p className="text-slate-600">
              Audited smart contracts and institutional-grade security for your digital assets.
            </p>
          </div>

          <div className="card text-left space-y-4">
            <div className="p-3 bg-blue-100 text-protox-primary rounded-xl w-fit">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Instant Yield</h3>
            <p className="text-slate-600">
              Start earning rewards the moment your transaction is confirmed on the ledger.
            </p>
          </div>

          <div className="card text-left space-y-4">
            <div className="p-3 bg-blue-100 text-protox-primary rounded-xl w-fit">
              <TrendingUp size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Optimized APY</h3>
            <p className="text-slate-600">
              Our algorithms automatically route funds to the most productive pools on Stellar.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
