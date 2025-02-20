import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BitbucketAccountDto } from './account.dto';
import { BitbucketPullRequestDto } from './pull-request.dto';
import { BitbucketRepositoryDto } from './repository.dto';

export class BitbucketWebhookDto {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => BitbucketAccountDto)
  actor: BitbucketAccountDto;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => BitbucketPullRequestDto)
  pullrequest: BitbucketPullRequestDto;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => BitbucketRepositoryDto)
  repository: BitbucketRepositoryDto;
}
