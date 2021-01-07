<template>
    <div class="blog-post">
        <div class="blog-post__thumb">
            <router-link to="/blog-details">
                <v-lazy-image 
                    :src="blogData.image" alt="blog image"
                />
            </router-link>
        </div>
        <div class="blog-post__content">
            <h4 class="blog-title">
                <router-link to="/blog-details">{{ blogData.title }}</router-link>
            </h4>
            <div class="blog-meta d-flex justify-content-between">
                <div class="date">
                    {{ blogData.postDate }}
                </div>
                <ul class="blog-meta-action">
                    <li>
                        <button>
                            <i class="fa fa-comment"></i>
                            {{ blogData.comment }}
                        </button>
                    </li>
                    <li>
                        <button>
                            <i class="fa fa-heart-o"></i>
                            {{ blogData.like }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['blogData']
    };
</script>