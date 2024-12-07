import { Injectable, Scope } from '@nestjs/common';

@Injectable(
    {scope: Scope.TRANSIENT,}
)
export class SongsService {
    private readonly songs = [];
    
    create(song){
        // Save the song in the database
        this.songs.push(song);
        return this.songs
    }

    findAll(){
        // fetch the songs from the db
        // throw new Error('Error in the database while fetching the record')
        return this.songs;
    }
} 
