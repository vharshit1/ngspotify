import { Album } from './../../Album';
import { Artist } from './../../Artist';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {SpotifyService} from '../../services/spotify.service';

@Component({
    moduleId:module.id,
    selector: 'artist',
    templateUrl: 'artist.component.html'
})
export class ArtistComponent implements OnInit{ 
    id:string;
    artist: Artist[];
    albums: Album[];
    
    constructor(
        private _spotifyService:SpotifyService, 
        private _route:ActivatedRoute){
        
    }
    
    ngOnInit(){
        this._route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this._spotifyService.getArtist(id)
                    .subscribe(artist => {
                        this.artist = artist;
                    })
                this._spotifyService.getAlbums(id)
                    .subscribe(albums => {
                        this.albums = albums.items;
                    })
            });
    }
}