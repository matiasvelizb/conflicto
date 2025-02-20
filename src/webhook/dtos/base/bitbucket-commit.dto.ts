import { IsString, IsNotEmpty } from 'class-validator';

export class BitbucketCommitDto {
  @IsString()
  @IsNotEmpty()
  hash: string;
}
