<template>
    <div class="comment-wrapper">
        <h3 class="heading">{{ comment.heading }}</h3>
        <ul>
            <li class="comment" v-for="comment in comment.comments" :key="comment.id" :class="{'comment__reply': comment.isReply}">
                <div class="comment__avatar">
                    <v-lazy-image :src="comment.authorImage" alt="thumbnail" />
                </div>
                <div class="comment__body">
                    <div class="header">
                        <h6 class="author-name">{{ comment.authorName }}</h6>
                        <p class="comment-date">{{ comment.CommentTime }}</p>
                    </div>
                    <p>{{ comment.desc }}</p>
                    <button class="reply-btn">Reply</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['comment']
    };
</script>