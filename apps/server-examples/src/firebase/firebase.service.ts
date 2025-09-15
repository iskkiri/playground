import { AppConfig, appConfig } from '@/common/config/app.config';
import { Inject, Injectable } from '@nestjs/common';
import { credential } from 'firebase-admin';
import { initializeApp, type App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';

@Injectable()
export class FirebaseService {
  private firebaseAdmin: App;

  constructor(
    @Inject(appConfig.KEY)
    private readonly config: AppConfig
  ) {
    this.firebaseAdmin = initializeApp({
      credential: credential.cert(JSON.parse(this.config.googleApplicationCredentials)),
    });
  }

  getFirestore() {
    return getFirestore(this.firebaseAdmin);
  }

  getMessaging() {
    return getMessaging(this.firebaseAdmin);
  }
}
