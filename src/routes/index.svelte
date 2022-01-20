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

<h1>ProtPlot v1.0</h1>
<LayoutGrid>
    <Cell span={6}>
        <Graph residue={residueString} scale={mapping.scale} window={windowSize}/>
    </Cell>
    <Cell span={2}>
        <Button on:click={() => {updateGraph(testProt);}}>
            <Label>Try a Test Protein</Label>
        </Button>
    </Cell>
    <Cell span={1}>
        <Button on:click={getFromAC}>
            <Label>Get From UniProt</Label>
        </Button>
    </Cell>
    <Cell>
        <Textfield bind:value={accessionNum} label="UniProt AC" />
    </Cell>
    <Cell>
        <Snackbar bind:this={badANum}>
            <Label>Error getting accession number.</Label>
        </Snackbar>
    </Cell>
    <Cell>
        <Select 
            key={(map) => map.name}
            bind:value={mapping} label="Select Scale">
            {#each Mappings as map (map.name)}
                <Option value={map}>{map.name}</Option>
            {/each}
        </Select>
    </Cell>
    <Cell>
        <Textfield bind:value={windowSize} label="Window Size" type="number" on:input={validateWindow} />
    </Cell>
    <Cell>
        <Textfield textarea
            input$rows={4}
            input$cols={20}
            input$resizable={false}
            variant="outlined"
            bind:value={residueString}
            label="Enter 1-letter residue sequence"
            input$maxlength={1000000000}
            on:input={validateResidue}
            >
            <CharacterCounter slot="internalCounter">0 / 1000000000</CharacterCounter>
        </Textfield>
    </Cell>
    <Cell class={"protinfo"}>
        <Label>Sequence ID: {sequenceID}</Label>
        <Label>Organism Sci Name: {name}</Label>
        <Label>Organism Common Name: {name1} </Label>
        <Label>Protein Name: {protName}</Label>
        <Label>Description: {desc}</Label>
    </Cell>
</LayoutGrid>

<style>
    .protinfo {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>