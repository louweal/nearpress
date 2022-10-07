<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8 offset-md-2">
          <h1>Write article</h1>
          <form class="gy-3">
            <div class="vstack gap-2">
              <div class="form-group">
                <label for="channel">Channel</label>

                <select
                  class="form-select"
                  aria-label="channel select"
                  id="channel"
                >
                  <option selected>Choose channel ...</option>
                  <option
                    value="c.slug"
                    v-for="(c, i) in [...$options.channels].sort((a, b) =>
                      a.title > b.title ? 1 : -1
                    )"
                    :key="i"
                  >
                    {{ c.title }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" />
              </div>

              <div class="form-group">
                <label for="content">Article content</label>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nesciunt ut provident maxime eligendi earum quae, fugiat atque
                  quisquam unde culpa! Molestias voluptas vero similique
                  consectetur incidunt laborum aut, et deleniti.
                </p>
                <textarea
                  class="form-control"
                  id="content"
                  rows="16"
                ></textarea>
              </div>

              <div class="form-group">
                <div class="btn btn-dark" id="image">Choose image</div>
              </div>

              <button class="btn btn-secondary" type="submit">Publish</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import channels from "@/data/channels.json";

export default {
  channels,
};
</script>

<style></style>
