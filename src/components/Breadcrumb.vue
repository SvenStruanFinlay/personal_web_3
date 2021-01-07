<template>
    <div class="breadcrumb-area">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="page-banner text-center">
                        <div class="section-title text-center">
                            <span class="water-text">{{ waterText }}</span>
                            <h2 class="title">{{ title }}</h2>
                        </div>
                        <breadcrumb class="page-breadcrumb" :items="items"></breadcrumb>
                    </div>
                </div>
            </div>  
        </div>
    </div>
</template>

<script>
    export default {
        props: ['items', 'title', 'waterText']
    }
</script>