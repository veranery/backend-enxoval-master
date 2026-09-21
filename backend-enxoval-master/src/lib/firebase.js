import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// As chaves abaixo vêm de variáveis de ambiente (arquivo .env local, ou
// variáveis de ambiente configuradas no Netlify em produção). Veja o
// arquivo ".env.example" na raiz do projeto para instruções completas de
// como criar o projeto no Firebase e preencher esses valores.
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Enquanto as variáveis não forem configuradas, o app continua funcionando
// normalmente, só que salvando apenas no aparelho (como já fazia antes),
// em vez de sincronizar entre aparelhos.
export const isFirebaseConfigured = Boolean(
	firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

let firestoreDb = null;

if (isFirebaseConfigured) {
	const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
	firestoreDb = getFirestore(app);
} else if (import.meta.env.DEV) {
	// eslint-disable-next-line no-console
	console.warn(
		'[Firebase] Variáveis VITE_FIREBASE_* não configuradas. A lista vai salvar apenas neste aparelho até isso ser feito. Veja o arquivo .env.example.'
	);
}

export const db = firestoreDb;
