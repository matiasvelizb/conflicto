import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BitbucketLinksDto } from './base/bitbucket-link.dto';

export class BitbucketRepositoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ValidateNested()
  @Type(() => BitbucketLinksDto)
  links: BitbucketLinksDto;
}
