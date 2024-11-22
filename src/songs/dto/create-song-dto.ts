// Add decorate based on the Validations
import {IsArray, IsString, IsNotEmpty, IsDateString, IsMilitaryTime} from 'class-validator'

export class CreateSongDTO {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsArray()
    @IsNotEmpty()
    @IsString({each: true}) // whatever string we passed in it, is gonna be true/okay. Tbh, it didn't worked without "each: true".
    readonly artist: string[];

    @IsNotEmpty()
    @IsDateString()
    readonly releaseDate: Date;

    @IsNotEmpty()
    @IsMilitaryTime()
    readonly duration: Date;
}