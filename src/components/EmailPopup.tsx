import React, { useState } from 'react';
import { X, Mail, Gift } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface EmailPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailPopup: React.FC<EmailPopupProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError('');

    try {
      console.log('Attempting to save email to Supabase:', email);
      
      // Tenter d'insérer l'email dans Supabase
      const { data, error: supabaseError } = await supabase
        .from('Theo_email')
        .insert([
          { 
            email: email,
            source: 'homepage-form'
          }
        ])
        .select();

      if (supabaseError) {
        console.error('Supabase error details:', {
          message: supabaseError.message,
          details: supabaseError.details,
          hint: supabaseError.hint,
          code: supabaseError.code
        });
        
        // Vérifier si c'est une erreur de configuration (clé API invalide, URL invalide, etc.)
        if (supabaseError.message?.includes('Invalid API key') || 
            supabaseError.message?.includes('JWT') ||
            supabaseError.message?.includes('Failed to fetch') ||
            supabaseError.code === 'PGRST301' ||
            supabaseError.code === '42501') {
          console.warn('Supabase configuration error detected, using WhatsApp fallback');
          throw new Error('SUPABASE_NOT_CONFIGURED');
        }
        
        // Pour les autres erreurs, les lancer normalement pour affichage
        throw supabaseError;
      }

      console.log('Email saved successfully!', data);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setEmail('');
      }, 3000);
    } catch (error: unknown) {
      console.error('Error saving email:', error);
      
      // Gérer les erreurs Supabase (qui sont des objets, pas toujours des Error)
      if (error && typeof error === 'object' && 'message' in error) {
        const errorMessage = String(error.message || '');
        
        if (errorMessage === 'SUPABASE_NOT_CONFIGURED') {
          // Rediriger vers WhatsApp comme fallback
          const message = `Bonjour ! Je souhaite obtenir une réduction sur vos services.\n\nMon email: ${email}`;
          const whatsappUrl = `https://wa.me/+17745069615?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
          
          // Afficher un message de succès
          setIsSuccess(true);
          setTimeout(() => {
            onClose();
            setIsSuccess(false);
            setEmail('');
          }, 3000);
          return;
        } else if (errorMessage.includes('Failed to fetch') || 
                   errorMessage.includes('NetworkError') ||
                   errorMessage.includes('fetch')) {
          setError('Problème de connexion. Vérifiez votre connexion internet et votre configuration Supabase.');
        } else if (errorMessage.includes('duplicate key') || 
                   errorMessage.includes('unique constraint')) {
          setError('Cette adresse email est déjà enregistrée.');
        } else if (errorMessage.includes('relation') && errorMessage.includes('does not exist')) {
          setError('Table non trouvée. Créez la table Theo_email dans Supabase.');
        } else if (errorMessage.includes('Invalid API key') || 
                   errorMessage.includes('JWT') ||
                   (error && typeof error === 'object' && 'code' in error && 
                    (error.code === 'PGRST301' || error.code === '42501'))) {
          setError('Clé API Supabase invalide. Redirection vers WhatsApp...');
          // Fallback vers WhatsApp
          const message = `Bonjour ! Je souhaite obtenir une réduction sur vos services.\n\nMon email: ${email}`;
          const whatsappUrl = `https://wa.me/+17745069615?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
          setIsSuccess(true);
          setTimeout(() => {
            onClose();
            setIsSuccess(false);
            setEmail('');
          }, 3000);
          return;
        } else {
          setError(`Erreur: ${errorMessage || 'Une erreur est survenue. Veuillez réessayer.'}`);
        }
      } else if (error instanceof Error) {
        if (error.message === 'SUPABASE_NOT_CONFIGURED') {
          const message = `Bonjour ! Je souhaite obtenir une réduction sur vos services.\n\nMon email: ${email}`;
          const whatsappUrl = `https://wa.me/+17745069615?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
          setIsSuccess(true);
          setTimeout(() => {
            onClose();
            setIsSuccess(false);
            setEmail('');
          }, 3000);
          return;
        }
        setError(`Erreur: ${error.message || 'Une erreur est survenue. Veuillez réessayer.'}`);
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {!isSuccess ? (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                🎉 Offre Spéciale !
              </h3>
              <p className="text-slate-600">
                Obtenez une réduction sur tous nos services en laissant votre email
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Votre adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Obtenir ma réduction'}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Nous respectons votre vie privée. Pas de spam, promis !
            </p>
          </>
        ) : (
          /* Success message */
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Merci !
            </h3>
            <p className="text-slate-600">
              Vous recevrez votre réduction par email.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailPopup;
