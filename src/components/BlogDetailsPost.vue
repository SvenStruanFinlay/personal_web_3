<template>
    <div class="blog-post">
        <div class="blog-post__thumb">
            <v-lazy-image src="/img/blog/blog-details.jpg" alt="blog image" />
        </div>
        <div class="blog-post__content blog-details">
            <h4 class="blog-title">
                {{ blog.title }}
            </h4>
            <div class="blog-meta d-flex justify-content-between">
                <div class="date">
                    {{ blog.meta.postDate }}
                </div>
                <ul class="blog-meta-action">
                    <li>
                        <button>
                            <i class="fa fa-comment"></i>
                            {{ blog.meta.comment }}
                        </button>
                    </li>
                    <li>
                        <button>
                            <i class="fa fa-heart-o"></i>
                            {{ blog.meta.like }}
                        </button>
                    </li>
                </ul>
            </div>
            <p>{{ blog.para_1 }}</p>
            <blockquote>
                <h4 class="blockquote-title">{{ blog.quoteTitle }}</h4>
            </blockquote>

            <p class="pb-4">{{ blog.para_2 }}</p>
            <div class="blog-post__thumb">
                <v-lazy-image :src="blog.blogMidleImage" alt="blog image" />
            </div>
            <p>{{ blog.para_3 }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['blog']
    };
</script>
