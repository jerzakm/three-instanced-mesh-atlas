<nav>
  <!--  -->
  <ul>
    <li>
      <a data-sveltekit-reload href="/basic">
        1 - Basic - Geometry UV shifting on a Mesh
      </a>
    </li>
    <li>
      <a data-sveltekit-reload href="/basic-batched">
        2 - Basic - Geometry UV shifting with BatchedMesh
      </a>
    </li>
    <li>
      <a data-sveltekit-reload href="/instanced-troika">
        3. Intermediate - Instancing with troika utils
      </a>
    </li>
  </ul>
</nav>

<slot />

<style>
  nav {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(5px);
    padding: 0.5rem 2rem;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  a {
    font-family: sans-serif;
    font-weight: 700;
    color: black;
  }
</style>
