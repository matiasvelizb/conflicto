import {
  IsString,
  IsNumber,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BitbucketAccountDto } from './account.dto';
import { BitbucketLinksDto } from './base/bitbucket-link.dto';
import { BitbucketBranchDto } from './base/bitbucket-branch.dto';
import { BitbucketCommitDto } from './base/bitbucket-commit.dto';

class BitbucketPullRequestBranchInfoDto {
  @ValidateNested()
  @Type(() => BitbucketBranchDto)
  branch: BitbucketBranchDto;

  @ValidateNested()
  @Type(() => BitbucketCommitDto)
  commit: BitbucketCommitDto;
}

export class BitbucketPullRequestDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  state: 'OPEN|MERGED|DECLINED';

  @ValidateNested()
  @Type(() => BitbucketAccountDto)
  author: BitbucketAccountDto;

  @ValidateNested()
  @Type(() => BitbucketPullRequestBranchInfoDto)
  source: BitbucketPullRequestBranchInfoDto;

  @ValidateNested()
  @Type(() => BitbucketPullRequestBranchInfoDto)
  destination: BitbucketPullRequestBranchInfoDto;

  @ValidateNested()
  @Type(() => BitbucketLinksDto)
  links: BitbucketLinksDto;
}
