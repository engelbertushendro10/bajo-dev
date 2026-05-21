import Link from 'next/link';
import { FiCheck } from 'react-icons/fi';

const benefits = [
  'Akses semua tutorial premium',
  'Source code lengkap setiap project',
  'Template & starter kit eksklusif',
  'Video tutorial tanpa batas',
  'Sertifikat kelulusan',
  'Diskusi prioritas di Discord',
];

const plans = [
  { name: 'Bulanan', price: '49.000', period: 'bulan', popular: false },
  { name: 'Tahunan', price: '299.000', period: 'tahun', popular: true, save: 'Hemat 49%' },
  { name: 'Lifetime', price: '999.000', period: 'selamanya', popular: false },
];

export default function ProPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 md:pt-32 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Upgrade ke <span className="text-blue-600">Premium</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Buka akses penuh ke semua materi premium dan jadi developer profesional.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <FiCheck className="text-blue-600 flex-shrink-0" size={20} />
              <span className="text-slate-700 dark:text-slate-300">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={`relative bg-white dark:bg-slate-800 rounded-2xl border-2 p-6 flex flex-col ${plan.popular ? 'border-blue-600 shadow-xl shadow-blue-600/10' : 'border-slate-200 dark:border-slate-700'}`}>
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                  {plan.save}
                </span>
              )}
              <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-slate-900 dark:text-white">Rp {plan.price}</span>
                <span className="text-slate-500">/{plan.period}</span>
              </div>
              <Link href="/login" className="w-full py-3 bg-blue-600 text-white text-center font-medium rounded-xl hover:bg-blue-700 transition-colors mt-auto">
                Pilih {plan.name}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-8">
          🔒 Pembayaran aman via Midtrans. Bisa transfer bank, e-wallet, dan lainnya.
        </p>
      </div>
    </div>
  );
}