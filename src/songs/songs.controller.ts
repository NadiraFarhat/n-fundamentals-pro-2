import { Body, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';
import { Song } from './song.entity';
import { UpdateSongDto } from './dto/update-song.dto';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller({
    path: 'songs',
    scope: Scope.REQUEST
})
export class SongsController {
    constructor(
        private songsService: SongsService,
        @Inject('CONNECTION') // injecting the connection
        private connection: Connection,
    ){
        console.log(`THIS IS THE CONNECTION STRING: ${this.connection.CONNECTION_STRING}`) // when songs controller is instanciated, this constructor funct will be called
    }

    @Post()
    create(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
        return this.songsService.create(createSongDTO);
    }

    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe)
        page: number = 1,
        @Query('page', new DefaultValuePipe(10), ParseIntPipe)
        limit: number = 10,
    ): Promise<Pagination<Song>>{
        try{
            return this.songsService.paginate({
                page, limit
            })
        }
        catch(e){
            throw new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get(':id')
    findOne(
        @Param(
            'id',
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
            }), // without the parse int pipe, the type of this id will be string
        )
        id: number,
    ): Promise<Song> {
        return this.songsService.findOne(id);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.songsService.remove(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateSongDTO: UpdateSongDto
    ): Promise < UpdateResult > {
    return this.songsService.update(id, updateSongDTO);
}

}
