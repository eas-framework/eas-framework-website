<script>
    const version = location.pathname.split('/')[2];
    let results = [];

    const input = document.querySelector('#search');
    input.addEventListener('input', async x => {
        if(!input.value){
            results = []
            return
        }
        const data = await fetch(`/search/${version}/${encodeURIComponent(input.value)}`);
        results = await data.json();
        console.log(results)
    });
</script>
{#if results.length}
    <div class="results">
        <div class="card m-5 p-5">
            {#each results as {text, url}}
                <a href={url}>{@html text}</a>
            {/each}
        </div>
    </div>
{/if}

<style lang="scss">
    .results {
        position: absolute;
        right: 6px;
        top: 70px;
        width: calc(100% - 10px);

        div a {
            display: block;
            margin-top: 5px;
        }
    }
</style>