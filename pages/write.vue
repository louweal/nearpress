<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8 offset-md-2">
          <h1>Write article</h1>

          <form>
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text" class="form-control" id="title" />
            </div>

            <div class="form-group">
              <label for="content">Article content</label>
              <textarea class="form-control" id="content" rows="16"></textarea>
            </div>

            <button class="btn btn-secondary" type="submit">Publish</button>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style></style>
