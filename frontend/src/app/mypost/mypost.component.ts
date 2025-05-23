// mypost.component.ts

import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-mypost',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './mypost.component.html',
    styleUrl: './mypost.component.css'
})
export class MypostComponent implements OnInit {
    myPosts: any[] = [];
    displayedPostList: any[] = [];
    constructor(private postService: PostService) { }
    ngOnInit(): void {
        this.getMyPosts();
    }
    getMyPosts(): void {
        if (typeof localStorage !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                this.postService.getMyPosts(token).subscribe((myPosts) => {
                    this.myPosts = myPosts;
                    this.displayedPostList = [...this.myPosts];
                    // Log the posts to check the attachment URLs
                    console.log(this.displayedPostList);
                });
            }
        }
    }
    filterPosts(searchTerm: string): void {
        if (searchTerm) {
            this.displayedPostList = this.myPosts.filter(post => 
                post.title.includes(searchTerm) || post.content.includes(searchTerm)
            );
        } else {
            this.displayedPostList = [...this.myPosts];
        }
    }
    onImageError(event: Event): void {
        const target = event.target as HTMLImageElement;
        target.src = 'path/to/placeholder/image.png'; // Provide a placeholder image path
    }
}