// Add decorate based on the Validations
import {IsArray, IsString, IsNotEmpty, IsDateString, IsMilitaryTime, IsOptional} from 'class-validator'

export class CreateSongDTO {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsArray()
    @IsNotEmpty()
    @IsString({each: true}) // whatever string we passed in it, is gonna be true/okay. Tbh, it didn't worked without "each: true".
    readonly artists: string[];

    @IsNotEmpty()
    @IsDateString()
    readonly releaseDate: Date;

    @IsNotEmpty()
    @IsMilitaryTime()
    readonly duration: Date;

    @IsString()
    @IsOptional()
    readonly lyrics: string; // added the lyrics field
}