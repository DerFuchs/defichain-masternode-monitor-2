<template>
	<q-page class="q-pa-md">
		<div class="row items-stretch q-col-gutter-md q-mb-md">
			<div :class="cardSizingClasses">
				<q-card class="full-height">
					<q-card-section class="text-h6">
						DeFiChain Masternode Monitor
					</q-card-section>
					<q-separator
						:class="{ 'light-gradient': user.settings.colorfulMode }"
					/>
					<q-card-section>
						This Software enables you to see what's going on with your
						masternodes. You can see a bunch of metrics and performance data,
						displayed as handy little cards. You can use it on any modern
						computer, tablet or smarthone.
					</q-card-section>
					<q-card-section>
						You can watch as many masternodes as you want. They don't
						necessarily have to be your own. Please notice that it is not
						recommended to watch more than ~25 masternodes because of the
						restrictions of the public data sources, every additional watched
						masternode takes everything a bit longer to load.
					</q-card-section>
				</q-card>
			</div>
			<div :class="cardSizingClasses">
				<q-card class="full-height">
					<q-card-section class="text-h6"> Security </q-card-section>
					<q-separator
						:class="{ 'light-gradient': user.settings.colorfulMode }"
					/>
					<q-card-section>
						Masternode Monitor can not manipulate your masternodes. All shown
						data is being fetched from public data sources.
					</q-card-section>
					<q-card-section>
						My goal and kind of a guideline when developing this application is
						to make it as decentralized as possible. That's why it does not
						track anything. There's no Google Analytics or something similar.
						You can use Masternode Monitor as privately as possible. And you can
						become even more private:
					</q-card-section>
					<q-card-section>
						You can use your own data source, too. Since Masternode Monitor is
						utilizing DeFiChain's Ocean infrastructure, you can simply put your
						own Ocean URL into the correspoding input field on the
						<router-link :to="{ name: 'settings' }">settings page</router-link>.
						You can run your own Ocean as a
						<a href="https://github.com/defichain-pond/pond-deploy"> Pond </a>
						instance. That's another DeFiChain project from my colleque and
						friend <a href="https://twitter.com/sancblock">@sancblock</a>
					</q-card-section>
					<q-card-section>
						In Theory, it's also possible to host Masternode Monitor by your
						own. But it utilizes
						<a href="https://fontawesome.com/"> Font Awesome Pro </a>, a premium
						icon library. To compile it on your own, you must own your own
						license. MaMon will probably support an alternative library in the
						future.
					</q-card-section>
				</q-card>
			</div>
			<div :class="cardSizingClasses">
				<q-card class="full-height">
					<q-card-section class="text-h6">
						Community Fund Proposals
					</q-card-section>
					<q-separator
						:class="{ 'light-gradient': user.settings.colorfulMode }"
					/>
					<q-card-section>
						Masternode Monitor has been funded twice by the great DeFiChain
						masternode owner community. Thank you so much for your support! This
						helped me a lot and also gave me confidence to become an active part
						of the wider DeFiChain community.
					</q-card-section>
					<q-card-section>
						<q-btn
							type="a"
							href="https://github.com/DeFiCh/dfips/issues/34"
							icon="fa-brands fa-github"
							label="CFP 2106-05"
						/>
						<q-btn
							type="a"
							href="https://github.com/DeFiCh/dfips/issues/137"
							icon="fa-brands fa-github"
							label="CFP-2203-10"
							class="q-ml-sm"
						/>
					</q-card-section>
				</q-card>
			</div>
			<div :class="cardSizingClasses">
				<q-card class="full-height">
					<q-card-section class="text-h6"> Code </q-card-section>
					<q-separator
						:class="{ 'light-gradient': user.settings.colorfulMode }"
					/>
					<q-card-section>
						Masternode Monitor's code is available at GitHub:
					</q-card-section>
					<q-card-section>
						<q-btn
							type="a"
							href="https://github.com/DerFuchs/defichain-masternode-monitor-2"
							icon="fa-brands fa-github"
							label="Masternode Monitor on GitHub"
						/>
					</q-card-section>
					<q-card-section>
						It is a <a href="https://vuejs.org/">Vue.js 3</a> appilcation, built
						on top of the great
						<a href="https://quasar.dev/">Quasar framework</a>.
					</q-card-section>
				</q-card>
			</div>
			<div :class="cardSizingClasses">
				<q-card class="full-height">
					<q-card-section class="text-h6"> @dt_buzzjoe </q-card-section>
					<q-separator
						:class="{ 'light-gradient': user.settings.colorfulMode }"
					/>
					<q-card-section>
						My name is Michael. I am a professional web developer since 2009. I
						am co-founder of a startup called SHÄP. We're developing a
						rent-everyting platform. I am a dad of two boys and got sucked into
						crypto in early 2017. My friends often describe me as a very
						friendly, creative and a positively crazy person. They also say that
						they can have great conversations with me and that's what I also
						enjoy the most.
					</q-card-section>
					<q-card-section>
						Feel free to contact me if you have any questions or improvement
						ideas. I am active on Twitter, too.
					</q-card-section>
					<q-card-section>
						<q-img src="img/portrait.jpg"></q-img>
					</q-card-section>
					<q-card-section>
						<q-btn
							type="a"
							href="https://twitter.com/dt_buzzjoe"
							label="@dt_buzzjoe"
							dense
							no-caps
							class="q-px-sm q-my-xs"
							icon="fa-brands fa-twitter"
						/>
						<q-btn
							type="a"
							href="https://www.linkedin.com/in/derfuchs/"
							label="DerFuchs"
							dense
							no-caps
							class="q-px-sm q-ml-sm q-my-xs"
							icon="fa-brands fa-linkedin"
						/>
						<q-btn
							type="a"
							href="https://github.com/DerFuchs"
							label="DerFuchs"
							dense
							no-caps
							class="q-px-sm q-ml-sm q-my-xs"
							icon="fa-brands fa-github"
						/>
						<q-btn
							type="a"
							href="https://www.polywork.com/michael_fuchs"
							label="Polywork"
							dense
							no-caps
							class="q-px-sm q-ml-sm q-my-xs"
						/>
					</q-card-section>
				</q-card>
			</div>
			<div :class="cardSizingClasses">
				<q-card class="full-height">
					<q-card-section class="text-h6"> Buy Me A Coffee </q-card-section>
					<q-separator
						:class="{ 'light-gradient': user.settings.colorfulMode }"
					/>
					<q-card-section>
						I sometimes get asked for a DeFiChain address where some DFI can be
						donated to. There have also been some questions about referral
						links. Here you go. That's all I can offer you.
					</q-card-section>
					<q-card-section>
						My DeFiChain address for donations:
						dEjRbNANBJYVGu7LwyHGn9RE872PCDvM5k
					</q-card-section>
					<q-card-section>
						<QRCodeVue3
							:width="400"
							:height="400"
							myclass="qr-container"
							imgclass="qr-image"
							:dots-options="{
								type: 'square',
								color: '#000',
							}"
							:corners-square-options="{ type: 'square', color: '#000' }"
							:qr-options="{
								typeNumber: 0,
								mode: 'Byte',
								errorCorrectionLevel: 'M',
							}"
							value="dEjRbNANBJYVGu7LwyHGn9RE872PCDvM5k"
						/>
					</q-card-section>
					<q-card-section> My referrals: </q-card-section>
					<q-card-section>
						<q-chip
							clickable
							size="sm"
							color="primary"
							@click="openURL('https://dfx.swiss/app?code=001-113')"
						>
							<q-avatar size="25px" style="background-color: #072440">
								<svg
									width="20"
									height="20"
									viewBox="0 0 93 30"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<g clip-path="url(#clip0_548_11767)">
										<path
											d="M15.87 14.5201C15.87 18.9001 12.32 22.4601 7.93 22.4601C3.54 22.4601 0 18.9001 0 14.5201C0 10.1401 3.55 6.58008 7.94 6.58008C12.33 6.58008 15.88 10.1301 15.88 14.5201"
											fill="#F5516C"
										/>
										<path
											d="M20.9194 0.210938H10.3594V6.02094H19.2094C23.8894 6.02094 27.7094 9.85094 27.7094 14.5209C27.7094 19.1909 23.8794 23.0209 19.2094 23.0209H10.3594V28.8309H20.5994C28.5994 28.8309 35.0794 22.3509 35.0794 14.3509C35.0794 6.35094 28.7394 0.210938 20.9194 0.210938Z"
											fill="#F7F7F7"
										/>
										<path
											d="M45.6419 5.39V13.07H57.9519V18.46H45.6419V29.04H38.9219V0H60.8719V5.39H45.6419Z"
											fill="#F7F7F7"
										/>
										<path
											d="M84.8405 29.04L77.8305 18.96L70.9505 29.04H63.2305L73.9705 14.27L63.7705 0H71.4005L78.0805 9.42L84.6405 0H91.9005L81.7705 14.02L92.6005 29.04H84.8405Z"
											fill="#F7F7F7"
										/>
										<path
											d="M15.8678 7.42969C15.1278 7.42969 14.4178 7.53969 13.7578 7.74969C15.6578 9.38969 16.8678 11.8097 16.8678 14.5197C16.8678 17.2297 15.6578 19.6397 13.7578 21.2897C14.4278 21.4997 15.1378 21.6097 15.8678 21.6097C19.7778 21.6097 22.9578 18.4397 22.9578 14.5197C22.9578 10.5997 19.7878 7.42969 15.8678 7.42969Z"
											fill="#F5516C"
										/>
									</g>
									<defs>
										<clipPath id="clip0_548_11767">
											<rect width="92.6" height="29.04" fill="white" />
										</clipPath>
									</defs>
								</svg>
							</q-avatar>
							sign up at DFX
						</q-chip>
						<q-chip
							clickable
							size="sm"
							color="primary"
							@click="openURL('https://app.cakedefi.com/?ref=821195')"
						>
							<q-avatar
								color="white"
								size="25px"
								class="q-ml-xs"
								@click="showRefs = !showRefs"
							>
								<q-img
									src="https://www.cakedefi.com/downloads/press-materials/cake/mark/mark-cakedefi-rgb.svg"
									alt="Cake Logo"
									width="20px"
								/>
							</q-avatar>
							sign up at Cake
						</q-chip>
						<q-chip
							clickable
							size="sm"
							color="primary"
							@click="
								openURL('https://accounts.binance.com/en/register?ref=EFAMBT81')
							"
						>
							<q-avatar size="25px" style="background-color: #072440">
								<svg
									width="15"
									height="15"
									viewBox="0 0 126.611 126.611"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<polygon
										fill="#F3BA2F"
										points="38.171,53.203 62.759,28.616 87.36,53.216 101.667,38.909 62.759,0 23.864,38.896 "
									/>
									<rect
										x="3.644"
										y="53.188"
										transform="matrix(0.7071 0.7071 -0.7071 0.7071 48.7933 8.8106)"
										fill="#F3BA2F"
										width="20.233"
										height="20.234"
									/>
									<polygon
										fill="#F3BA2F"
										points="38.171,73.408 62.759,97.995 87.359,73.396 101.674,87.695 101.667,87.703 62.759,126.611   23.863,87.716 23.843,87.696 "
									/>
									<rect
										x="101.64"
										y="53.189"
										transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 235.5457 29.0503)"
										fill="#F3BA2F"
										width="20.234"
										height="20.233"
									/>
									<polygon
										fill="#F3BA2F"
										points="77.271,63.298 77.277,63.298 62.759,48.78 52.03,59.509 52.029,59.509 50.797,60.742 48.254,63.285   48.254,63.285 48.234,63.305 48.254,63.326 62.759,77.831 77.277,63.313 77.284,63.305 "
									/>
								</svg>
							</q-avatar>
							sign up at Binance
						</q-chip>
					</q-card-section>
				</q-card>
			</div>
		</div>
	</q-page>
</template>

<script>
import { defineComponent } from "vue";

import { openURL } from "quasar";
import { useUserStore } from "stores/user.js";
import QRCodeVue3 from "qrcode-vue3";

export default defineComponent({
	name: "WtfPage",

	components: {
		QRCodeVue3,
	},

	setup() {
		return {
			user: useUserStore(),
			cardSizingClasses: "col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2",
			openURL,
		};
	},
});
</script>

<style lang="sass">
a
  color: $primary

.qr-container
  background-color: #fff
  padding: 10px

.qr-image
  width: 100%
  height: 100%
  object-fit: contain
</style>
