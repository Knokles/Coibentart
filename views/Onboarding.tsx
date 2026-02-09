
import React, { useState } from 'react';

interface OnboardingProps {
  onFinish: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  
  const steps = [
    {
      title: "Benvenuto",
      text: "La tua nuova app per gestire timbrature, ferie e buste paga in modo semplice.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9KprUy3Jkix_hbdYMVMhRMTM8yCsxynwuDpreBiBVDpkGKMIOVR4qjSc5Jbxdd0OMJkzScHVWW5eybmzGxQE40-qLJwvHkYmiuQRRRIRVq8EHhG5LdRc4CI7HRhXIKdo4Vy5V4HTGi1v5SdkDHuNC5Ts5wtinrE56llCy7ykASh5SVsZBA58Y1j35nKYWTU6KO4y-U_tPBU3AJxi3zGG8XF3c5-b1tIk2tH9ceJq6kEX-L2tqh7cNoi2PnGQNHijgdJkyi6HK-uE"
    },
    {
      title: "Timbratura Smart",
      text: "Registra la tua presenza in cantiere con verifica GPS e foto identificativa.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA889y9Y0Acb3oK2_S654UmcueHe6LObfFJamtpOvN-XO756X16FeKsexUsum0oWSiFjbSt8x5ipzdgmhkhZZz-XsILSA7FG1gsyaEmI3k0FzKSjZsKWbAEJSCo6C09A-XXvS5nggG6lHx3LAklHr-s6X4mlQCSJzBz5vJCcVgMasxllL4nl7UszefSKrL5CHeR4m8xWnvRo3mHqXIZHZqR4k8aUR-v2lEVas7w7wD0fr0udHTaXJiU0uVhtP02yUN7-BXEKH9Tdsg"
    }
  ];

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onFinish();
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
      <button onClick={onFinish} className="absolute top-10 right-6 text-sm text-gray-400 font-bold uppercase tracking-wider">
        Salta
      </button>

      <div className="w-full max-w-sm flex-1 flex flex-col items-center justify-center">
        <div className="w-full aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden mb-12 border border-gray-100">
           <img src={steps[step].image} alt="Step" className="w-full h-full object-cover grayscale-[20%]" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">{steps[step].title}</h1>
        <p className="text-gray-500 leading-relaxed mb-8">{steps[step].text}</p>
        
        <div className="flex gap-2 mb-12">
          {steps.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-6 bg-[#4CAF50]' : 'w-2 bg-gray-200'}`} />
          ))}
        </div>
      </div>

      <button 
        onClick={next}
        className="w-full max-w-sm bg-[#4CAF50] text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        {step === steps.length - 1 ? 'Inizia' : 'Avanti'}
        <span className="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>
  );
};

export default Onboarding;
