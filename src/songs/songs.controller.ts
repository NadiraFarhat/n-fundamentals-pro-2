import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {
    constructor(private songsService: SongsService){}

    @Post()
    create(@Body() createSongDTO: CreateSongDTO){ // change was made here
        return this.songsService.create(createSongDTO); // and here
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
    findOne(){
        return "fetch songs based on id"
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
