import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Connection } from 'src/common/constants/connection';
import { Song } from './song.entity';

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
    findAll(){
        try{
            return this.songsService.findAll();
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
    ){
        return `fetch songs based on id ${typeof id}`
    }

    @Put(':id')
    update(){
        return "update song on the based on id"
    }

    @Delete(':id')
    delete(){
        return "delete song based on id"
    }

}
