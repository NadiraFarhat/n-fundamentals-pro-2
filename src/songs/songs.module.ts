import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from 'src/artists/artist.entity';

const mockSongsService = {
  findAll() {
    return [{ id: 1, title: 'Lasting Lover', artist: 'Siagla'}]; // this is the mock value that will be used in the testing
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongsController],
  providers: [
    SongsService,
    // {
    //   provide: SongsService,
    //   useClass: SongsService // this is the standard provider
    // } 
    // {
    //   provide: SongsService,
    //   useValue: mockSongsService // this is the value provider
    // }
    {
      provide: 'CONNECTION',
      useValue: connection // this is a provider that is used as a dependency
    }
  ]
})
export class SongsModule {}
