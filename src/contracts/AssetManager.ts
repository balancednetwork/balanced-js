import { Converter as IconConverter } from "icon-sdk-js";

import addresses from "../addresses";
import ContractSettings from "../contractSettings";
import { Contract } from "./contract";

export default class AssetManager extends Contract {
	constructor(contractSettings: ContractSettings) {
		super(contractSettings);
		this.address = addresses[this.nid].assetManager;
	}

	withdrawTo(amount: string, asset: string, to: string, fee: string) {
		const payload = this.transactionParamsBuilder({
			method: "withdrawTo",
			value: IconConverter.toHexNumber(fee),
			params: {
				amount: IconConverter.toHexNumber(amount),
				asset,
				to,
			},
		});

		return this.callICONPlugins(payload);
	}

	withdrawNativeTo(amount: string, asset: string, to: string, fee: string) {
		const payload = this.transactionParamsBuilder({
			method: "withdrawNativeTo",
			value: IconConverter.toHexNumber(fee),
			params: {
				amount: IconConverter.toHexNumber(amount),
				asset,
				to,
			},
		});

		return this.callICONPlugins(payload);
	}

	getAssets() {
		const callParams = this.paramsBuilder({
			method: "getAssets",
		});

		return this.call(callParams);
	}

	getAssetDeposit(networkAddress: string) {
		const callParams = this.paramsBuilder({
			method: "getAssetDeposit",
			params: {
				tokenNetworkAddress: networkAddress,
			},
		});

		return this.call(callParams);
	}

	getAssetChainDepositLimit(networkAddress: string) {
		const callParams = this.paramsBuilder({
			method: "getAssetChainDepositLimit",
			params: {
				tokenNetworkAddress: networkAddress,
			},
		});

		return this.call(callParams);
	}
}
