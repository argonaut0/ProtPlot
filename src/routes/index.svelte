<script>
    import Graph from "./_graph.svelte";
    import Button, { Label } from '@smui/button';
    import Textfield from "@smui/textfield";
    import Select, { Option } from '@smui/select';
    import CharacterCounter from '@smui/textfield/character-counter';
    import { Mappings } from './scales';
    import Snackbar from '@smui/snackbar';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    const testProt = "MLELLPTAVEGVSQAQITGRPEWIWLALGTALMGLGTLYFLVKGMGVSDPDAKKFYAITTLVPAIAFTMYLSMLLGYGLTMVPFGGEQNPIYWARYADWLFTTPLLLLDLALLVDADQGTILALVGADGIMIGTGLVGALTKVYSYRFVWWAISTAAMLYILYVLFFGFTSKAESMRPEVASTFKVLRNVTVVLWSAYPVVWLIGSEGAGIVPLNIETLLFMVLDVSAKVGFGLILLRSRAIFGEAEAPEPSAGDGAAATSD";
    let residueString = "";
    let windowSize = 3;
    let accessionNum = "";
    let mapping = Mappings[0];
    let badANum;


    let sequenceID = "";
    let name = "";
    let name1 = "";
    let protName = "";
    let desc = "";

    function updateGraph(r) {
        if (r !== undefined)
            residueString = r;
        sequenceID = "";
        name = "";
        name1 = "";
        protName = "";
        desc = "";
    }

    function validateWindow() {
        if (windowSize < 1) {
            windowSize = 1;
        }

        if (windowSize > residueString.length) {
            windowSize = residueString.length;
        }
    }

    function validateResidue() {
        updateGraph(residueString.toUpperCase());
    }

    function getFromAC() {
        const req = fetch(`https://www.ebi.ac.uk/proteins/api/proteins/${accessionNum}`);
        req.then((r) => {
            return r.json();
        }).then((r) => {
            residueString = r.sequence.sequence;
            sequenceID = r.id;
            name = r.organism.names[0].value;
            name1 = r.organism.names[1].value;
            protName = r.protein.recommendedName.fullName.value;
            desc = r.comments[0].text[0].value;

        }).catch(badANum.open);
    }

    function tryTest() {
        accessionNum = "P05130";
        getFromAC();
    }
    
</script>

<head>
    <!-- Material Icons -->
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <!-- Roboto -->
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
    />
    <!-- Roboto Mono -->
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto+Mono"
    />
    <!-- SMUI Styles -->
    <link rel="stylesheet" href="/smui.css" />
</head>

<h1 class="header">ProtPlot v1.0</h1>
<div class="center">
    <div class="main">
        <Graph residue={residueString} scale={mapping.scale} window={windowSize}/>
        <div class="layout">
            <div class="vertsec">
                <Select 
                    key={(map) => map.name}
                    bind:value={mapping} label="Select Scale">
                    {#each Mappings as map (map.name)}
                        <Option value={map}>{map.name}</Option>
                    {/each}
                </Select>
                <Textfield bind:value={windowSize} label="Window Size" type="number" on:input={validateWindow} />
                <Textfield bind:value={accessionNum} label="UniProt AC" />
                <Button on:click={getFromAC}>
                    <Label>Get From UniProt</Label>
                </Button>
                <Button on:click={tryTest}>
                    <Label>Try a Test Protein</Label>
                </Button>
                <Snackbar bind:this={badANum}>
                    <Label>Error getting accession number.</Label>
                </Snackbar>
            </div>
            <Textfield textarea
                input$rows={12}
                input$cols={30}
                input$resizable={false}
                variant="outlined"
                bind:value={residueString}
                label="Enter 1-letter residue sequence"
                input$maxlength={1000000000}
                on:input={validateResidue}
                >
                <CharacterCounter slot="internalCounter">0 / 1000000000</CharacterCounter>
            </Textfield>
            <div class="vertsec">
                <Textfield class="" textarea disabled variant="outlined" bind:value={sequenceID} label="Sequence ID" input$rows={1}
                input$cols={30}
                input$resizable={false}></Textfield>
                <Textfield textarea disabled variant="outlined" bind:value={name} label="Organism Sci Name" input$rows={1}
                input$cols={30}
                input$resizable={false}></Textfield>
                <Textfield textarea disabled variant="outlined" bind:value={name1} label="Organism Common Name" input$rows={1}
                input$cols={30}
                input$resizable={false}></Textfield>
                <Textfield textarea disabled variant="outlined" bind:value={protName} label="Protein Name"
                    input$rows={1}
                    input$cols={30}
                    input$resizable={false}
                ></Textfield>
                <Textfield textarea disabled variant="outlined" bind:value={desc} label="Description"
                    input$rows={4}
                    input$cols={30}
                    input$resizable={false}
                ></Textfield>
            </div>
        </div>
    </div>
</div>

<style>
    .header {
        font-family: Roboto;
        width: 100%;
        text-align: center;
        background-color: aquamarine;
    }
    .center {
        display: flex;
        justify-content: center;
    }
    .main {
        display: flex;
        flex-direction: column;
    }
    .layout {
        display: flex;
        justify-content: space-between;
    }
    .vertsec {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: left;
    }
</style>