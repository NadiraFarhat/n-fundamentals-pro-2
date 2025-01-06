import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable(
    {scope: Scope.TRANSIENT,}
)
export class SongsService {
    constructor(
        @InjectRepository(Song)
        private songRepository: Repository<Song>
    ) {}
    async create(songDTO: CreateSongDTO): Promise<Song>{
        const song = new Song();
        song.title = songDTO.title;
        song.artists = songDTO.artists;
        song.duration = songDTO.duration;
        song.lyrics = songDTO.lyrics;
        song.releasedDate = songDTO.releaseDate;

        return await this.songRepository.save(song);
    }

    findAll(): Promise<Song[]>{
        return this.songRepository.find();
    }

    findOne(id: number): Promise<Song> {
        return this.songRepository.findOneBy({id});
    }

    async remove(id: number): Promise<void> {
        await this.songRepository.delete(id);
    }

    update (id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
        return this.songRepository.update(id, recordToUpdate)
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
        const queryBuilder = this.songRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.releasedDate', 'ASC');
        return paginate<Song>(this.songRepository, options)
    }
} 
