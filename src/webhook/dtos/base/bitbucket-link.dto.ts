import { Type } from 'class-transformer';
import { IsUrl, IsNotEmpty, ValidateNested } from 'class-validator';

export class BitbucketLinkDto {
  @IsUrl()
  @IsNotEmpty()
  href: string;
}

export class BitbucketLinksDto {
  @ValidateNested()
  @Type(() => BitbucketLinkDto)
  html: BitbucketLinkDto;
}
