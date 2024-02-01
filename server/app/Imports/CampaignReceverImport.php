<?php

namespace App\Imports;

use App\CampaignRecever;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class CampaignReceverImport implements ToModel, WithChunkReading, ShouldQueue
{
    private $campaign_id;
    public function __construct($camp_id) {
        $this->campaign_id = $camp_id;
    }
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new CampaignRecever([
            'recever'     => $row[0],
            'campaign_id' => $this->campaign_id
        ]);
    }
    public function chunkSize(): int
    {
        return 1000;
    }
}
