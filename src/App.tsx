import React, { useState } from 'react';
import { Wallet, Copy, CheckCircle2, XCircle, ArrowUpRight, ArrowDownLeft, Shield, AlertCircle, Bot, ExternalLink } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'send' | 'receive';
  amount: string;
  token: string;
  to?: string;
  from?: string;
  timestamp: string;
  hash: string;
  status: 'confirmed' | 'pending' | 'failed';
}

interface Approval {
  id: string;
  dapp: string;
  logo: string;
  spendingLimit: string;
  token: string;
  used: string;
  grantedDate: string;
  address: string;
}

function App() {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [activeTab, setActiveTab] = useState<'transactions' | 'approvals'>('transactions');
  const [revokedApprovals, setRevokedApprovals] = useState<Set<string>>(new Set());

  const agentAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
  const balance = '24.857';
  const usdValue = '41,234.56';

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'send',
      amount: '2.5',
      token: 'ETH',
      to: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
      timestamp: '2 hours ago',
      hash: '0x1a2b3c4d5e6f7g8h9i0j',
      status: 'confirmed'
    },
    {
      id: '2',
      type: 'receive',
      amount: '10.0',
      token: 'ETH',
      from: '0x1234567890abcdef1234567890abcdef12345678',
      timestamp: '5 hours ago',
      hash: '0x9i8h7g6f5e4d3c2b1a0',
      status: 'confirmed'
    },
    {
      id: '3',
      type: 'send',
      amount: '1.2',
      token: 'ETH',
      to: '0xabcdef1234567890abcdef1234567890abcdef12',
      timestamp: '1 day ago',
      hash: '0xaabbccddeeff00112233',
      status: 'confirmed'
    },
    {
      id: '4',
      type: 'send',
      amount: '0.5',
      token: 'ETH',
      to: '0x5566778899aabbccddeeff00112233445566778',
      timestamp: '2 days ago',
      hash: '0x556677889900aabbccdd',
      status: 'pending'
    },
    {
      id: '5',
      type: 'receive',
      amount: '5.0',
      token: 'ETH',
      from: '0x9988776655443322110099887766554433221100',
      timestamp: '3 days ago',
      hash: '0x998877665544332211',
      status: 'confirmed'
    }
  ];

  const approvals: Approval[] = [
    {
      id: '1',
      dapp: 'Uniswap',
      logo: '🦄',
      spendingLimit: '100.0',
      token: 'USDC',
      used: '45.2',
      grantedDate: 'Jan 15, 2024',
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
    },
    {
      id: '2',
      dapp: 'Aave',
      logo: '👻',
      spendingLimit: '50.0',
      token: 'ETH',
      used: '12.5',
      grantedDate: 'Jan 10, 2024',
      address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9'
    },
    {
      id: '3',
      dapp: 'OpenSea',
      logo: '🌊',
      spendingLimit: 'Unlimited',
      token: 'WETH',
      used: '3.7',
      grantedDate: 'Dec 28, 2023',
      address: '0x00000000006c3852cbEf3e08E8dF289169EdE581'
    },
    {
      id: '4',
      dapp: 'SushiSwap',
      logo: '🍣',
      spendingLimit: '200.0',
      token: 'DAI',
      used: '0.0',
      grantedDate: 'Dec 20, 2023',
      address: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F'
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(agentAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleRevoke = (approvalId: string) => {
    setRevokedApprovals(prev => new Set([...prev, approvalId]));
  };

  const truncateAddress = (address: string, start = 6, end = 4) => {
    return `${address.slice(0, start)}...${address.slice(-end)}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getUsagePercentage = (used: string, limit: string) => {
    if (limit === 'Unlimited') return 0;
    return (parseFloat(used) / parseFloat(limit)) * 100;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-purple-600 rounded-xl">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AI Agent Wallet</h1>
              <p className="text-purple-300 text-sm">Autonomous on-chain operations</p>
            </div>
          </div>
        </div>

        {/* Wallet Card */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 mb-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Agent Address</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <span className="text-white font-mono text-sm">{truncateAddress(agentAddress, 8, 6)}</span>
              <button
                onClick={copyToClipboard}
                className="hover:bg-white/20 rounded p-1 transition-colors"
              >
                {copiedAddress ? (
                  <CheckCircle2 className="w-4 h-4 text-green-300" />
                ) : (
                  <Copy className="w-4 h-4 text-white" />
                )}
              </button>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="text-white/80 text-sm mb-1">Total Balance</div>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-bold text-white">{balance}</span>
              <span className="text-2xl text-white/90">ETH</span>
            </div>
            <div className="text-white/70 text-lg mt-1">${usdValue} USD</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'transactions'
                ? 'bg-white text-purple-900 shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <ArrowUpRight className="w-4 h-4" />
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('approvals')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'approvals'
                ? 'bg-white text-purple-900 shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Shield className="w-4 h-4" />
            Approvals
          </button>
        </div>

        {/* Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl">
          {activeTab === 'transactions' ? (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Recent Transactions</h2>
                <div className="text-purple-300 text-sm">{transactions.length} total</div>
              </div>
              
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-2.5 rounded-lg ${
                          tx.type === 'send' ? 'bg-red-500/20' : 'bg-green-500/20'
                        }`}>
                          {tx.type === 'send' ? (
                            <ArrowUpRight className="w-5 h-5 text-red-400" />
                          ) : (
                            <ArrowDownLeft className="w-5 h-5 text-green-400" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-semibold capitalize">{tx.type}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              tx.status === 'confirmed' ? 'bg-green-500/20 text-green-300' :
                              tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-red-500/20 text-red-300'
                            }`}>
                              {tx.status}
                            </span>
                          </div>
                          
                          <div className="text-purple-300 text-sm font-mono mb-2">
                            {tx.type === 'send' ? 'To: ' : 'From: '}
                            {truncateAddress(tx.type === 'send' ? tx.to! : tx.from!)}
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-purple-200">{tx.timestamp}</span>
                            <a
                              href="#"
                              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                            >
                              <span className="font-mono text-xs">{truncateAddress(tx.hash)}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-xl font-bold ${
                          tx.type === 'send' ? 'text-red-400' : 'text-green-400'
                        }`}>
                          {tx.type === 'send' ? '-' : '+'}{tx.amount} {tx.token}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Spending Approvals</h2>
                <div className="flex items-center gap-2 text-yellow-300 text-sm bg-yellow-500/10 px-3 py-1.5 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  {approvals.filter(a => !revokedApprovals.has(a.id)).length} active
                </div>
              </div>
              
              <div className="space-y-4">
                {approvals.map((approval) => {
                  const isRevoked = revokedApprovals.has(approval.id);
                  const usagePercent = getUsagePercentage(approval.used, approval.spendingLimit);
                  
                  return (
                    <div
                      key={approval.id}
                      className={`bg-white/5 backdrop-blur border rounded-xl p-5 transition-all ${
                        isRevoked
                          ? 'border-red-500/30 bg-red-500/5 opacity-60'
                          : 'border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="text-4xl">{approval.logo}</div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-white">{approval.dapp}</h3>
                              {isRevoked && (
                                <span className="text-xs px-2 py-1 bg-red-500/20 text-red-300 rounded-full font-medium">
                                  Revoked
                                </span>
                              )}
                            </div>
                            
                            <div className="text-purple-300 text-sm font-mono mb-3">
                              {truncateAddress(approval.address, 10, 8)}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-3">
                              <div>
                                <div className="text-purple-200 text-xs mb-1">Spending Limit</div>
                                <div className="text-white font-semibold">
                                  {approval.spendingLimit} {approval.token}
                                </div>
                              </div>
                              <div>
                                <div className="text-purple-200 text-xs mb-1">Used</div>
                                <div className="text-white font-semibold">
                                  {approval.used} {approval.token}
                                </div>
                              </div>
                            </div>
                            
                            {approval.spendingLimit !== 'Unlimited' && (
                              <div>
                                <div className="flex items-center justify-between text-xs text-purple-200 mb-1">
                                  <span>Usage</span>
                                  <span>{usagePercent.toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all ${
                                      usagePercent > 80 ? 'bg-red-500' :
                                      usagePercent > 50 ? 'bg-yellow-500' :
                                      'bg-green-500'
                                    }`}
                                    style={{ width: `${usagePercent}%` }}
                                  />
                                </div>
                              </div>
                            )}
                            
                            <div className="text-purple-300 text-xs mt-3">
                              Granted: {approval.grantedDate}
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleRevoke(approval.id)}
                          disabled={isRevoked}
                          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                            isRevoked
                              ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                              : 'bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30'
                          }`}
                        >
                          <XCircle className="w-4 h-4" />
                          {isRevoked ? 'Revoked' : 'Revoke'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-purple-300 text-sm">
          <p>Autonomous agent managing on-chain assets securely</p>
        </div>
      </div>
    </div>
  );
}

export default App;