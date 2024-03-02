/* Created by : Ali Mohammad Jobaer
Student ID : 103835483 */

const recommendations = {
    "abiencoderv2-array": "Use a compiler >= 0.5.10.",
    "arbitrary-send-erc20": "Use msg.sender as from in transferFrom.",
    "incorrect-shift": "Swap the order of parameters.",
    "multiple-constructors": "Only declare one constructor, preferably using the new scheme constructor(...) instead of function <contractName>.",
    "name-reused": "Rename the contract.",
    "arbitrary-send-eth": "Ensure that an arbitrary user cannot withdraw unauthorized funds.",
    "reentrancy-eth": "Apply the check-effects-interactions pattern.",
    "reentrancy-no-eth": "Apply the check-effects-interactions pattern.",
    "uninitialized-local": "Initialize all the variables. If a variable is meant to be initialized to zero, explicitly set it to zero to improve code readability.",
    "unused-return": "Ensure that all the return values of the function calls are used.",
    "events-access": "Emit an event for critical parameter changes.",
    "missing-zero-check": "Check that the address is not zero.",
    "reentrancy-benign": "Apply the check-effects-interactions pattern.",
    "reentrancy-events": "Apply the check-effects-interactions pattern.",
    "timestamp": "Avoid relying on block.timestamp.",
    "assembly": "Do not use evm assembly.",
    "dead-code": "Remove unused functions.",
    "solc-version": "Consider using the latest version of Solidity for testing.",
    "low-level-calls": "Avoid low-level calls. Check the call success. If the call is meant for a contract, check for code existence.",
    "naming-convention": "Follow the Solidity naming convention.",
    "reentrancy-unlimited-gas": "Apply the check-effects-interactions pattern.",
    "similar-names": "Prevent variables from having similar names.",
    "unused-state": "Remove unused state variables."
};

module.exports = recommendations;
