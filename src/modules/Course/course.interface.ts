import { ObjectId } from 'mongoose';

export interface ICourse {
  userId: ObjectId;
  courseTitle: string;
  courseDescription: string;
  thumbnail: string;
  bannerImages?: string[];
  registrationStartDate: Date;
  registrationEndDate: Date;
  classStartDate: Date;
  classEndDate: Date;
  courseDuration: string;
  registrationFee?: number;
  certificateAvailability: boolean;
  category: string;
  level: string;
  status: 'pending' | 'approve' | 'rejected';
  feedback?: string;
  rejectionReason?: string;
  isPaid: boolean;
  courseOverviewVideoLink?: string;
}
