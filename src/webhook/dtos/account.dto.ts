import { IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';

export class BitbucketAccountDto {
  @IsOptional()
  @IsString()
  nickname?: string;

  @IsString()
  @IsNotEmpty()
  display_name: string;

  @IsEnum(['user', 'team', 'app_user'])
  @IsNotEmpty()
  type: 'user' | 'team' | 'app_user';
}
