<template>
    <v-container class="single-post-page">
        <section class="post">
            <h1>Title of the Post</h1>
            <div class="post-details">
                <div>Last Updated on XXX</div>
                <div>Written By Name</div>
            </div>
            <p>Content of the post</p>
        </section>
        <section class="post-feedback">
            <p>Let me know you think about the post, send me a mail to <a href="mailto:feedback@example.com">feedback@example.com</a> </p>
        </section>
    </v-container>
</template>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>

