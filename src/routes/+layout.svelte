<nav>
  <!--  -->
  <ul>
    <li>
      <a data-sveltekit-reload href="/basic">
        1. Basic - UV shifting on a PlaneGeometry
      </a>
    </li>
    <li>
      <a data-sveltekit-reload href="/basic-batched">
        1.a. Basic - but with BatchedMesh
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
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
  }
  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
  }
  a {
    color: black;
  }
</style>
