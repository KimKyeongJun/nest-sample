export class UserInfoUserRes {
  constructor(
    readonly userSeq: number,
    readonly id: string,
    readonly nickName: string,
    readonly email: string,
    readonly phoneNumber: string,
    readonly thumbnailImage: string,
    readonly userCode: string,
    readonly lastLoginAt: Date,
    readonly deleteAt: Date,
    readonly createAt: Date,
    readonly updateAt: Date,
    readonly registerType: string,
    readonly usageAgreeFlag: string,
    readonly marketingAgreeFlag: string,
    readonly dormantFlag: string,
    readonly deleteFlag: string,
    readonly additionalProfile: AdditionalProfile,
  ) {}
}

export class AdditionalProfile {
  constructor(
    readonly name: string,
    readonly birthYear: string,
    readonly ageRange: string,
    readonly gender: string,
    readonly plusFriendFlag: string,
    readonly inviteCode: string,
    readonly createAt: Date,
    readonly updateAt: Date,
    readonly birthDay: string,
  ) {}
}
