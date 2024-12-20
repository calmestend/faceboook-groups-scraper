import { gotScraping } from 'got-scraping';
import * as fs from "fs";
import * as cheerio from "cheerio";
import { throws } from 'assert';


const fetchLsd = async (group) => {
	try {
		const res = await gotScraping({
			url: `https://www.facebook.com/groups/${group}/`
		})
		const $ = cheerio.load(res.body);
		const lsd = $('input[name="lsd"]');
		const lsdValue = lsd.val();
		return lsdValue;
	} catch (error) {
		console.err({message: error.message});
	}
}

const fetchPosts = async (group, lsd) => {
	try {
		const res = await fetch("https://www.facebook.com/api/graphql/", {
			headers: { "accept": "*/*", "accept-language": "en-US,en;q=0.9",
				"content-type": "application/x-www-form-urlencoded",
				"priority": "u=1, i",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
				"x-fb-friendly-name": "GroupsCometFeedRegularStoriesPaginationQuery",
				"x-fb-lsd": lsd,
				"Referer": `https://www.facebook.com/groups/${group}/`,
				"Referrer-Policy": "origin-when-cross-origin"
			},
			body: `av=0&__aaid=0&__user=0&__a=1&__req=e&__hs=20077.HYP%3Acomet_loggedout_pkg.2.1.0.0.0&dpr=1&__ccg=EXCELLENT&__rev=1019005512&__s=3ymxpy%3A0u5mhb%3Aw8ebeq&__hsi=7450297757378833600&__dyn=7xeUmwlEnwn8yEqxemh0no6u5U4e1Nxt3odEc8co2qwJyE24wJwpUe8hw6vwb-q1ew6ywMwto2awgo9oO0-E4a3a4oaEd82lwv89k2C1Fwc60D85m1mzXw8W58jwGzE2ZwJK14xm3y1lUlDw-waCm260lCq2-azo3iwPwbS16xi4UdUcobUak0KU566E6C13G1-wkFo5G7E4-8wLwHwGwbu&__csr=g8-ItRdb5juJR98yYGcxibsyTKiQWhrKubBES8BS_AyFe5FpBzUKVEW4kFp-XBy4bQazqCzEycAVAnhoLz8-mmraXm8VEymhBxCFbgSmi9WABxy5ayk4-Z0UGfCxul2FUiuE3Pw9W072kQV4Q26qdwiQ3y0lB06GUfU6606C80rtU34w1fu0p-E1uE1jFV82gaqagLDG0lCE30g6rwio1g8y5pU1tE3bw1zANoF3pS00R8E6q1zwey3G0cOiwfG0kWoIE0Km2q5UZxh1i1uw73wbe0na1Fa0wo7m2L8ax23G1Lwiokg34yUd1Am0Om3C0FU1sQ0RUaovx60bcxUxU24xJa5Q6KA5u4UW15F5zU-mhBBzCmt3qXgqogEyyErzoG12VQ4j6wUwdq9g7aF8iiDGa3o2fx2ayA0BUAMfU2xHkAMbF82lyUkw48wQAw810cG78B9woUfo6a0Ad0HBwda080Eja7UsK1aaqawcO095J4we60K8eE1icMS1Fxy6yyo6qFk0iZw4Idw14mfC8042Q8BwoA07BU6G260aIG5Q6W4Pxm0aAw2xWxa0Vz0Tyo6Kaw6Owd-1dgwi1xa1cwhEC260qa1KyK0yU2qg2_a15w45wc20Wo40aFxIi6o2M80tcwfU9qwGBOo2_wlo1mU98d8mUS0lC24yqywQ3y0C817U1eE5a8wm81OU&__comet_req=15&lsd=${lsd}&jazoest=21038&__spin_r=1019005512&__spin_b=trunk&__spin_t=1734657622&qpl_active_flow_ids=431626709&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=GroupsCometFeedRegularStoriesPaginationQuery&variables=%7B%22count%22%3A3%2C%22cursor%22%3A%22Cg8TZXhpc3RpbmdfdW5pdF9jb3VudAICDwtyZWFsX2N1cnNvcg%2BfQVFIUlZzR3dMZ3laT3B2b0ZTSlNxTTdjLTRHX2F1eHJOLV93dkk2T0J1d1dvT1BoZFZkZXIxQXJ1UFNfdE82S21PanIzY0ZpbUZRd0VuRjh5RHZNLXdoeXNBOmV5SXdJam94TnpNME5qVTNOakl5TENJeElqbzNOamd5TENJeklqb3dMQ0kwSWpveExDSTFJam95TENJMklqb3RNWDA9DxNoZWFkZXJfZ2xvYmFsX2NvdW50AgEPEm1haW5fZmVlZF9wb3NpdGlvbgICDw1mZWVkX29yZGVyaW5nDxtyYW5rZWRfaW50ZXJlc3RfY29tbXVuaXRpZXMPE2lzX2V2ZXJncmVlbl9jdXJzb3IRAA8iaXNfb2ZmbGluZV9hZ2dyZWdhdGVkX3Bvc3RzX2N1cnNvchEADxJncm91cF9mZWVkX3ZlcnNpb24PAlYyDxBkZW1vdGVkX3Bvc3RfaWRzCgEB%22%2C%22feedLocation%22%3A%22GROUP%22%2C%22feedType%22%3A%22DISCUSSION%22%2C%22feedbackSource%22%3A0%2C%22focusCommentID%22%3Anull%2C%22privacySelectorRenderLocation%22%3A%22COMET_STREAM%22%2C%22renderLocation%22%3A%22group%22%2C%22scale%22%3A1%2C%22sortingSetting%22%3A%22TOP_POSTS%22%2C%22stream_initial_count%22%3A1%2C%22useDefaultActor%22%3Afalse%2C%22id%22%3A%22502367064521405%22%2C%22__relay_internal__pv__GHLShouldChangeAdIdFieldNamerelayprovider%22%3Afalse%2C%22__relay_internal__pv__GHLShouldChangeSponsoredDataFieldNamerelayprovider%22%3Afalse%2C%22__relay_internal__pv__IsWorkUserrelayprovider%22%3Afalse%2C%22__relay_internal__pv__CometFeedStoryDynamicResolutionPhotoAttachmentRenderer_experimentWidthrelayprovider%22%3A500%2C%22__relay_internal__pv__CometImmersivePhotoCanUserDisable3DMotionrelayprovider%22%3Afalse%2C%22__relay_internal__pv__IsMergQAPollsrelayprovider%22%3Afalse%2C%22__relay_internal__pv__FBReelsMediaFooter_comet_enable_reels_ads_gkrelayprovider%22%3Afalse%2C%22__relay_internal__pv__CometUFIReactionsEnableShortNamerelayprovider%22%3Afalse%2C%22__relay_internal__pv__CometUFIShareActionMigrationrelayprovider%22%3Atrue%2C%22__relay_internal__pv__StoriesArmadilloReplyEnabledrelayprovider%22%3Afalse%2C%22__relay_internal__pv__EventCometCardImage_prefetchEventImagerelayprovider%22%3Afalse%7D&server_timestamps=true&doc_id=8710004115744333`,
			method: "POST"
		});	

		const text = await res.text();
		fs.writeFileSync("test.html", text);

	} catch (error) {
		console.err({message: error.message});
	}
}

(async() => {
	const group = "502367064521405";
	const lsd = await fetchLsd();
	await fetchPosts(group, lsd);
})();
