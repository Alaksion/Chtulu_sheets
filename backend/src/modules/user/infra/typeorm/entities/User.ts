import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';
import UploadConfig from '@config/UploadConfig';

@Entity('user')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  userAvatar: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Expose({ name: 'avatarUrl' })
  getAvatarUrl(): string | null {
    if (!this.userAvatar) {
      return null;
    }
    switch (UploadConfig.driver) {
      case 'localDisk':
        return this.userAvatar
          ? `${process.env.API_URL}/files/${this.userAvatar}`
          : null;
      default:
        return null;
    }
  }
}

export default User;
