<script>
    let isExpanded = false;

    function handleMouseEnter() {
        isExpanded = true;
    }

    function handleMouseLeave() {
        isExpanded = false;
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div 
    class="fixed h-screen transition-all duration-300 ease-in-out bg-teal-600 text-white"
    class:w-16={!isExpanded}
    class:w-64={isExpanded}
    on:mouseenter={handleMouseEnter} 
    on:mouseleave={handleMouseLeave}>
    
    <ul class="space-y-4 p-4 pt-12">
        <li class="w-full h-full flex flex-row space-x-2 items-center my-2 px-1 transition-all hover:bg-teal-500 rounded">
            <span class="h-full text-xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 100 100">
                    <path fill="white" d="M83.505 37.85L51.013 12.688a2.51 2.51 0 0 0-3.1.025L16.46 37.874a2.5 2.5 0 0 0-.939 1.956v45.5a2.504 2.504 0 0 0 2.505 2.505h18.697a2.506 2.506 0 0 0 2.505-2.505V57.471h21.54V85.33a2.505 2.505 0 0 0 2.505 2.505h18.7a2.506 2.506 0 0 0 2.505-2.505v-45.5a2.5 2.5 0 0 0-.973-1.98" />
                </svg>
            </span>
            {#if isExpanded}
                <a href="/home" class="flex w-full h-full animate-fade">
                    <button class="w-full h-full text-left flex items-center justify-start">
                        Inicio
                    </button>
                </a>
            {/if}
        </li>
        <li class="w-full h-full flex flex-row space-x-2 items-center my-2 px-1 transition-all hover:bg-teal-500 rounded">
            <span class="h-full text-xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
                    <path fill="white" d="M14.59 2.59c-.38-.38-.89-.59-1.42-.59H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8.83c0-.53-.21-1.04-.59-1.41zM15 16h-2v2c0 .55-.45 1-1 1s-1-.45-1-1v-2H9c-.55 0-1-.45-1-1s.45-1 1-1h2v-2c0-.55.45-1 1-1s1 .45 1 1v2h2c.55 0 1 .45 1 1s-.45 1-1 1m-2-8V3.5L18.5 9H14c-.55 0-1-.45-1-1" />
                </svg>
            </span>
            {#if isExpanded}
                <a href="/home/cotizar" class="flex w-full h-full animate-fade">
                    <button class="w-full h-full text-left flex items-center justify-start">
                        Cotizar
                    </button>
                </a>
            {/if}
        </li>
        <li class="w-full h-full flex flex-row space-x-2 items-center my-2 px-1 transition-all hover:bg-teal-500 rounded">
            <span class="h-full text-xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="white" d="M4 8h16V5H4zm10 11v-9h-4v9zm2 0h4v-9h-4zm-8 0v-9H4v9zM3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1" />
                </svg>
            </span>
            {#if isExpanded}
                <a href="/home/modificar" class="flex w-full h-full animate-fade">
                    <button class="w-full h-full text-left flex items-center justify-start">
                        Modificar
                    </button>
                </a>
            {/if}
        </li>
        <li class="w-full h-full flex flex-row space-x-2 items-center my-2 px-1 transition-all hover:bg-teal-500 rounded">
            <span class="h-full text-xl flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="white" d="M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23a.987.987 0 0 0-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31c-.06-.5-.49-.88-.99-.88h-3.73c-.51 0-.94.38-1 .88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1-.02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41a7.3 7.3 0 0 0 0 1.35l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1 .02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.03-.23.04-.45.04-.68m-7.46 3.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5" />
                </svg>
            </span>
            {#if isExpanded}
                <a href="/home/settings" class="flex w-full h-full animate-fade">
                    <button class="w-full h-full text-left flex items-center justify-start">
                        Configuración
                    </button>
                </a>
            {/if}
        </li>
    </ul>
</div>
