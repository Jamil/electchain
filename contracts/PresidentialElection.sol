// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
 
contract PresidentialElections {
    struct StateResult {
        string[] parties;
        uint32[] votes;
    }
    
    mapping (uint16 => mapping(string => StateResult)) results;
    
    function sendResult(uint16 year, string calldata state, string[] calldata parties, uint32[] calldata votes) public {
        if (msg.sender == address(0x48c4412306d11d8011ccBA1DfB9925DB00A395E6)) {
            StateResult memory stateResult = StateResult(parties, votes);
            results[year][state] = stateResult;
        }
    }
    
    function getResult(uint16 year, string calldata state) public view returns (StateResult memory result) {
        return results[year][state];
    }
}

