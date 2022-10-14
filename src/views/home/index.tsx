import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  render() {
    return (
      <div>
        <div>hello home</div>
        <div>
          <RouterLink to="/editor">editor</RouterLink>
        </div>
      </div>
    )
  }
})