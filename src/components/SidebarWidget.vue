<template>
    <div class="sidebar-widget__wrapper">
        <!-- widget item start -->
        <div class="blog-widget mt-30">
            <h4 class="blog-widget__title">{{ sidebar.searchTitle }}</h4>
            <form class="widget-search-form">
                <input placeholder="Search keyword" type="text" class="search-field">
                <button type="submit" class="search-btn">
                    <i class="fa fa-search"></i>
                </button>
            </form>
        </div>
        <!-- widget item end -->

        <!-- widget item start -->
        <div class="blog-widget mt-30">
            <h4 class="blog-widget__title">{{ sidebar.categoryTitle }}</h4>
            <ul class="blog-widget__categories">
                <li v-for="category in sidebar.categories" :key="category.id">
                    <router-link to="/blog">{{ category.title }}</router-link>
                    <span>({{ category.count }})</span>
                </li>
            </ul>
        </div>
        <!-- widget item end -->

        <!-- widget item start -->
        <div class="blog-widget mt-30">
            <h4 class="blog-widget__title">{{ sidebar.recentPostTitle }}</h4>
            <ul class="recent-posts-inner">
                <li class="recent-posts" v-for="post in sidebar.recentPosts" :key="post.id">
                    <div class="recent-posts-image">
                        <router-link to="/blog-details">
                            <img :src="post.image" :alt="post.alt">
                        </router-link>
                    </div>
                    <div class="recent-posts-body">
                        <span class="recent-posts-meta">{{ post.date }}</span>
                        <h6 class="recent-posts-title">
                            <router-link to="/blog-details">
                                {{ post.title }}
                            </router-link>
                        </h6>
                    </div>
                </li>
            </ul>
        </div>
        <!-- widget item end -->

        <!-- widget item start -->
        <div class="blog-widget mt-30">
            <h4 class="blog-widget__title">{{ sidebar.tagTitle }}</h4>
            <div class="blog-tag">
                <router-link :to="tag.link" v-for="tag in sidebar.tags" :key="tag.id">
                    {{ tag.name }}
                </router-link>
            </div>
        </div>
        <!-- widget item end -->
    </div>
</template>

<script>
    export default {
        props: ['sidebar']
    };
</script>