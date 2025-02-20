import { IsString, IsNotEmpty } from 'class-validator';

export class BitbucketBranchDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
