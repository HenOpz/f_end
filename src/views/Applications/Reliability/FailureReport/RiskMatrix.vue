<template>
    <div id="risk-matrix" class="rbi-grid">
        <div class="rbi-item rbi-span-5 rbi-row-span-2 rbi-lightgray" style="border-left: 0;">CoF</div>
        <div class="rbi-item rbi-span-5 rbi-lightgray">PoF</div>
        <div class="rbi-item rbi-extra-lightgray">A<br>Rare</div>
        <div class="rbi-item rbi-extra-lightgray">B<br>Unlikely</div>
        <div class="rbi-item rbi-extra-lightgray">C<br>Possible</div>
        <div class="rbi-item rbi-extra-lightgray">D<br>Likely</div>
        <div class="rbi-item rbi-extra-lightgray">E<br>Almost Certain</div>

        <div class="rbi-item rbi-black" style="border-left: 0;"></div>
        <div class="rbi-item rbi-extra-lightgray">People</div>
        <div class="rbi-item rbi-extra-lightgray">Environment</div>
        <div class="rbi-item rbi-extra-lightgray">Asset / Production</div>
        <div class="rbi-item rbi-extra-lightgray">Reputation</div>

        <div class="rbi-item">Never heard in E&P industry but could occur</div>
        <div class="rbi-item">Event has occurred in the E&P industry or is unlikely to occur in CPOC</div>
        <div class="rbi-item">Event occurred more than once in the E&P industry or has occurred in CPOC</div>
        <div class="rbi-item">Event occurred several time per year in the E&P industry or once per year in CPOC</div>
        <div class="rbi-item">Event occurred frequently in the E&P industry or occurred several times per year in CPOC</div>

        <!-- 5 -->
        <div class="rbi-item rbi-lightgray" style="border-left: 0;">5<br>Critical</div>
        <div class="rbi-item">Multiple Fatalities</div>
        <div class="rbi-item">
            <ul class="rbi-ul">
                <li>Spill > 5,000 bbl</li>
                <li>Tier 3</li>
                <li>Regional Assistance</li>
            </ul>
        </div>
        <div class="rbi-item">Loss > USD50M</div>
        <div class="rbi-item">
            <ul class="rbi-ul">
                <li>International Media Coverage</li>
                <li>Formal Complaint from International NGOs</li>
            </ul>
        </div>
        <div class="rbi-item rbi-yellow" id="A5"></div>
        <div class="rbi-item rbi-orange" id="B5"></div>
        <div class="rbi-item rbi-red" id="C5"></div>
        <div class="rbi-item rbi-red" id="D5"></div>
        <div class="rbi-item rbi-red" id="E5"></div>

        <!-- 4 -->
        <div class="rbi-item rbi-lightgray" style="border-left: 0;">4<br>Serious</div>
        <div class="rbi-item">
            <ul class="rbi-ul">
                <li>1 Fatality</li>
                <li>1 Permanent Disable Injury</li>
                <li>Multiple Lost Workdays Case</li>
            </ul>
        </div>
        <div class="rbi-item">
            <ul class="rbi-ul">
                <li>100 &#60; Spill &#60; 5,000 bbl</li>
                <li>Tier 2</li>
                <li>Industry association involvement</li>
            </ul>
        </div>
        <div class="rbi-item">Loss between USD5M - USD50M</div>
        <div class="rbi-item">
            <ul class="rbi-ul">
                <li>National Media Coverage</li>
                <li>Local Community Protest</li>
            </ul>
        </div>
        <div class="rbi-item rbi-yellow" id="A4"></div>
        <div class="rbi-item rbi-yellow" id="B4"></div>
        <div class="rbi-item rbi-orange" id="C4"></div>
        <div class="rbi-item rbi-red" id="D4"></div>
        <div class="rbi-item rbi-red" id="E4"></div>

        <!-- 3 -->
        <div class="rbi-item rbi-lightgray" style="border-left: 0;">3<br>Significant</div>
        <div class="rbi-item">
            <ul class="rbi-ul">
                <li>1 Lost Workdays Case</li>
                <li>Multiple Restricted Workdays Case</li>
            </ul>
        </div>
        <div class="rbi-item">
            <ul class="rbi-ul">
                <li>10 &#60; Spill &#60; 100 bbl</li>
                <li>Tier 1</li>
                <li>Localized Effect</li>
            </ul>
        </div>
        <div class="rbi-item">Loss between USD100K - USD5M</div>
        <div class="rbi-item">
            <ul class="rbi-ul">
                <li>Regional Media Coverage</li>
                <li>Online Media Spread</li>
                <li>Local Community Protest</li>
            </ul>
        </div>
        <div class="rbi-item rbi-green" id="A3"></div>
        <div class="rbi-item rbi-yellow" id="B3"></div>
        <div class="rbi-item rbi-yellow" id="C3"></div>
        <div class="rbi-item rbi-orange" id="D3"></div>
        <div class="rbi-item rbi-red" id="E3"></div>

        <!-- 2 -->
        <div class="rbi-item rbi-lightgray" style="border-left: 0;">2<br>Moderate</div>
        <div class="rbi-item">
            <ul class="rbi-ul">
                <li>Medical Treatment Case</li>
                <li>1 Restricted Workdays Case</li>
            </ul>
        </div>
        <div class="rbi-item">
            <ul class="rbi-ul">
                <li>1 &#60; Spill &#60; 10 bbl</li>
                <li>Moderate Effect</li>
            </ul>
        </div>
        <div class="rbi-item">Loss between USD10K - USD100K</div>
        <div class="rbi-item">
            <ul class="rbi-ul">
                <li>Local Media Interest</li>
                <li>Influenced Online Media Post</li>
                <li>Local Community Aggregation</li>
            </ul>
        </div>
        <div class="rbi-item rbi-green" id="A2"></div>
        <div class="rbi-item rbi-green" id="B2"></div>
        <div class="rbi-item rbi-yellow" id="C2"></div>
        <div class="rbi-item rbi-yellow" id="D2"></div>
        <div class="rbi-item rbi-orange" id="E2"></div>

        <!-- 1 -->
        <div class="rbi-item rbi-lightgray" style="border-left: 0; border-bottom: 0;">1<br>Minor</div>
        <div class="rbi-item" style="border-bottom: 0;">
            Minor Health Effect/Injury With First Aid
        </div>
        <div class="rbi-item" style="border-bottom: 0;">
            <ul class="rbi-ul">
                <li>Spill &#60; 1 bbl</li>
                <li>Slight Effect</li>
            </ul>
        </div>
        <div class="rbi-item" style="border-bottom: 0;">Loss &#60; USD10K</div>
        <div class="rbi-item" style="border-bottom: 0;">
            <ul class="rbi-ul">
                <li>No News Coverage</li>
                <li>Non-Influenced Online Media Post</li>
            </ul>
        </div>
        <div class="rbi-item rbi-green" style="border-bottom: 0;" id="A1"></div>
        <div class="rbi-item rbi-green" style="border-bottom: 0;" id="B1"></div>
        <div class="rbi-item rbi-green" style="border-bottom: 0;" id="C1"></div>
        <div class="rbi-item rbi-yellow" style="border-bottom: 0;" id="D1"></div>
        <div class="rbi-item rbi-yellow" style="border-bottom: 0;" id="E1"></div>
    </div>
</template>
<script>
export default {
    name: "risk-matrix",
    props: {
        data: Object,
        pdf: Boolean
    },
    components: {},
    created() {
        if (this.$store.state.status.server == true) {
            this.$nextTick(function () {
                window.setTimeout(() => {
                    this.SET_SELECTED();
                },500);
            })
        }
    },
    data() {
        return {};
    },
    computed: {},
    methods: {
        SET_SELECTED() {
            const risk_matrix = document.getElementById('risk-matrix');
            if (risk_matrix && this.pdf) risk_matrix.setAttribute('pdf', '');
            const element = document.getElementById(this.data.risk_level);
            if (element) element.setAttribute('selected', '');
        }
    }
};
</script>
<style lang="scss" scoped>
.rbi-grid {
    font-size: 8px;
    aspect-ratio: 5/ 1;
    text-align: center;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
}
.rbi-grid[pdf] {
    font-size: 36px !important;
}
.rbi-ul {
    margin: 0;
    padding-left: 15px;
    text-align: start;
}
.rbi-item {
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
}
.rbi-red {
    aspect-ratio: 1 / 1;
    background-color: rgba(255, 0, 0, 0.15);
}
.rbi-red[selected] {
    background-color: rgba(255, 0, 0, 1);
}
.rbi-orange {
    aspect-ratio: 1 /1;
    background-color: rgba(250, 162, 0, 0.15);
}
.rbi-orange[selected] {
    background-color: #FCA400;
}
.rbi-yellow {
    aspect-ratio: 1 / 1;
    background-color: rgba(255, 255, 0, 0.15);
}
.rbi-yellow[selected] {
    background-color: #ffff00;
}
.rbi-green {
    aspect-ratio: 1 / 1;
    background-color: rgba(0, 221, 0, 0.15);
}
.rbi-green[selected] {
    background-color: #00DD00;
}
.rbi-black {
    background-color: black;
}
.rbi-extra-lightgray {
    background-color: #eee;
}
.rbi-lightgray {
    background-color: lightgray;
}
.rbi-span-5 {
    grid-column: span 5;
}
.rbi-span-10 {
    grid-column: span 10;
}
.rbi-row-span-2 {
    grid-row: span 2;
}
</style>