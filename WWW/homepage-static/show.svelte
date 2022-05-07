<script>
    export let files = []
    export let viewHTML = ''
    export let folder = ''
    export let title = 'Add Title'

    const localIframe = name => `/homepage-static/vscode-template/view?folder=${folder}&file=${name}`

    let current = files[0];
    let showCode = false;
</script>

<div class="view-page shadow p-10 m-auto my-15">
    <div class="d-flex justify-content-between align-items-top mb-10 border-bottom">
        <div class="title">{title}</div>
        <button class="btn btn-primary" on:click={() => showCode = !showCode}>
            Toggle Code
        </button>
    </div>

    <div class="explorer-container flex-warp align-items-stretch">
        <div class="explorer border">
            <p class="text-center">Files</p>
            <hr/>
            <div class="files">
                {#each files as file}
                <div class="explorer-item p-10 btn btn-link d-block" on:click={() => (current = file, showCode = true)}>
                    {file}
                </div>
            {/each}
            </div>
        </div>
        <div class="viewer">
            <div class="view-file">
                <iframe src={showCode ? localIframe(current): viewHTML} title={showCode ? current: 'HTML Render'}></iframe>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .view-page {

        .title {
            font-size: 3rem;
            font-weight: 200;
            margin: 0;
        }

        max-width: 800px;

        .explorer-container  {
            display: flex;

            @media screen and (max-width: 768px) {
                display: block;

                .explorer .files {
                    overflow: auto;
                    height: 120px;
                }
            }

            .viewer {
                width: 100%;

                .view-file {
                    height: 500px;

                    iframe {
                        height: 100%;
                        width: 100%;
                        border: none
                    }
                }
            }
        }
    }
</style>