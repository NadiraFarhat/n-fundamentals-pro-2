// Add decorate based on the Validations
import {IsArray, IsString, IsNotEmpty, IsDateString, IsMilitaryTime} from 'class-validator'

export class CreateSongDTO {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsArray()
    @IsNotEmpty()
    @IsString()
    readonly artist: Array<string>;

    @IsNotEmpty()
    @IsDateString()
    readonly releaseDate: Date;

    @IsNotEmpty()
    @IsMilitaryTime()
    readonly duration: Date;
}